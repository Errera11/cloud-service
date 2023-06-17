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
            if (file.parent) {
                const parentFile = await this.fileRepository.findOne({where: {id: file.parent}})
                filePath = path.resolve(parentFile.path, file.name)
            } else filePath = path.resolve(__dirname, '..', '..', 'files', file.userId, file.name)
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
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
            const user = await this.userService.findUserById(userId)
            const fileType = file.name.split('.').slice(-1)[0]
            if (await this.fileRepository.findOne({where: {user_id: userId, name: file.name}})) {
                throw new BadRequestException('File already exists');
            }
            let filePath: string;
            if (parent) {
                const parentFile = await this.fileRepository.findOne({where: {id: file.name}})
                filePath = path.resolve(parentFile.path, file.name)
            } else filePath = path.resolve(__dirname, '..', '..', 'files', file.userId, file.name)
            fs.writeFileSync(filePath, file)
            this.fileRepository.create({name: file.name, type: fileType})
        } catch (e) {
            throw e;
        }

    }
}