import {BadRequestException, Injectable, Req} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {FileEntity} from "./File.entity";
const path = require('path')
const fs = require('fs')


@Injectable()
export class FileService {
    constructor (@InjectModel(FileEntity) private fileRepository: typeof FileEntity) {
    }
    async createFile(file) {
        try {
            let filePath: string;
            if(file.parent) {
                const parentFile = await this.fileRepository.findOne({where: {id: file.parent}})
                filePath = path.resolve(parentFile.path, file.name)
            } else filePath = path.resolve(__dirname, '..', '..', 'files', file.userId, file.name)
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
                return this.fileRepository.create({user_id: file.userId, path: filePath, parentId: file?.parent || file.userId, name: file.name})
            }
            else {
                throw new BadRequestException('File already exists');
            }
        } catch (e) {
            throw e;
        }
    }

    getFiles(userId, parentId) {
        try {
            return this.fileRepository.findAll({where: {parentId, user_id: userId}})
        } catch (e) {
            throw e;
        }
    }
}