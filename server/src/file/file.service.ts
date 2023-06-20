import {BadRequestException, forwardRef, Inject, Injectable, Req} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {FileEntity} from "./File.entity";
import {UserService} from "../user/user.service";

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
                if(file.type == 'user reg') return
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

    getFiles(userId, parentId) {
        try {
            return this.fileRepository.findAll(parentId ?
                {where: {parentId, user_id: userId}} :
                {where: {user_id: userId}})
        } catch (e) {
            throw e;
        }
    }

    async createFile(file, userId, parent) {
        try {
            const fileSize = Math.round(file.size / 1024)
            const user = await this.userService.findUserById(userId)
            if(fileSize + user.usedSpace > user.diskSpace) throw new BadRequestException('Cloud is full!')
            const fileType = file.originalname.split('.').slice(-1)[0]
            const filename = file.originalname.split('.').slice(0, -1)[0]
            if (await this.fileRepository.findOne({where: {user_id: userId, name: filename}})) {
                throw new BadRequestException('File already exists');
            }
            let filePath: string;
            if (parent && !(typeof parent == 'string')) {
                const parentFile = await this.fileRepository.findOne({where: {id: parent}})
                filePath = path.resolve(parentFile.path, file.originalname)
            } else filePath = path.resolve(__dirname, '..', '..', 'files', userId, file.originalname)
            fs.writeFileSync(filePath, file.buffer)
            const createdFile
                = await this.fileRepository.create({user_id: userId, path: filePath, parentId: parent, name: filename, type: fileType, size: fileSize})
            this.userService.updateUser(userId, {usedSpace: user.usedSpace + fileSize} )
            return createdFile;
        } catch (e) {
            throw e;
        }

    }
}