import {BadRequestException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {FileEntity} from "./File.entity";
import {UserService} from "../user/user.service";
import {Op} from "sequelize";

const path = require('path')
const fs = require('fs')


@Injectable()
export class FileService {
    constructor(@InjectModel(FileEntity) private fileRepository: typeof FileEntity,
                @Inject(forwardRef(() => UserService)) private userService: UserService) {
    }

    async createDir(file) {
        try {
            let filePath: string;
            if (file.parent && !(typeof file.parent == 'string')) {
                const parentFile = await this.fileRepository.findOne({where: {id: file.parent}})
                filePath = path.resolve(parentFile.path, file.name)
            } else {
                filePath = path.resolve(__dirname, '..', '..', 'files', file.userId, file?.name || '')
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
                if (file.type == 'user reg') return
                return this.fileRepository.create({
                    user_id: file.userId,
                    path: filePath,
                    parentId: file?.parent || file.userId,
                    name: file.name
                })
            } else {
                throw new BadRequestException('File already exists');
            }
        } catch (e) {
            throw e;
        }
    }

    getFiles(userId, parentId, sortOptions, searchOptions) {
        try {
            return this.fileRepository.findAll({
                order: [[sortOptions || 'id', 'ASC']],
                where: {
                    [Op.and]: {
                        name: {
                            [Op.like]: `%${searchOptions}%`,
                        },
                        ...(parentId ?
                            {parentId, user_id: userId} :
                            {user_id: userId}),
                    }
                }
            })
        } catch (e) {
            throw e;
        }
    }

    async createFile(file, userId, parent) {
        try {
            const fileSize = Math.round(file.size / 1024)
            const user = await this.userService.findUserById(userId)
            if (fileSize + user.usedSpace > user.diskSpace) throw new BadRequestException('Cloud is full!')
            const fileType = file.originalname.split('.').slice(-1)[0]
            const filename = file.originalname.split('.').slice(0, -1)[0]
            if (await this.fileRepository.findOne({where: {user_id: userId, name: filename}})) {
                throw new BadRequestException('File already exists');
            }
            let filePath: string;
            if (Number(parent)) {
                const parentFile = await this.fileRepository.findOne({where: {id: parent}})
                filePath = path.resolve(parentFile.path, file.originalname)
            } else filePath = path.resolve(__dirname, '..', '..', 'files', userId, file.originalname)
            fs.writeFileSync(filePath, file.buffer)
            const createdFile
                = await this.fileRepository.create({
                user_id: userId,
                path: filePath,
                parentId: parent,
                name: filename,
                type: fileType,
                size: fileSize
            })
            this.userService.updateUser(userId, {usedSpace: user.usedSpace + fileSize})
            return createdFile;
        } catch (e) {
            throw e;
        }

    }

    async downloadFile(userId, fileId) {
        const file = await this.fileRepository.findOne({where: {user_id: userId, id: fileId}});
        if (!file) throw new BadRequestException('File does not exist')
        const filePath = file.path;
        return fs.createReadStream(filePath)

    }

    async deleteFile(fileId) {
        const file = await this.fileRepository.findOne({where: {id: fileId}})
        if (!file) return new BadRequestException('File does not exist')
        if (fs.lstatSync(file.path).isDirectory) {
            fs.rmSync(file.path, {recursive: true})
        } else {
            fs.unlink(file.path)
        }
        this.fileRepository.destroy({where: {id: fileId}})
        return 'File deleted'
    }
}