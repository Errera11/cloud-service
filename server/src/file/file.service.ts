import {BadRequestException, Injectable, Req} from "@nestjs/common";
import {FileDto} from "./dto/File.Dto";
import {InjectModel} from "@nestjs/sequelize";
import {FileEntity} from "./File.entity";
const path = require('path')
const fs = require('fs')


@Injectable()
export class FileService {
    constructor (@InjectModel(FileEntity) private fileRepository: typeof FileEntity) {
    }
    createDir(file) {
        try {
            const filePath = path.resolve(__dirname, '..', '..', 'files', file.userId, file?.parent, file.name)
            console.log(filePath);
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
                //return this.fileRepository.create({})
            }
            else throw new BadRequestException('File already exists');
        } catch (e) {
            throw new Error(e)
        }
    }
}