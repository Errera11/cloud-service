import {BadRequestException, Body, Controller, Get, Post, Query, Req} from "@nestjs/common";
import {FileDto} from "./dto/File.Dto";
import {FileService} from "./file.service";
import {FileEntity} from "./File.entity";

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {
    }

    @Post('')
    async createFile(@Req() req: Request, @Body() file: FileDto): Promise<FileEntity> {
        try {
            return await this.fileService.createFile({...file, userId: req.headers['user'].id})
        } catch (e) {
            throw new BadRequestException('File already exists');
        }

    }

    @Get('')
    async getFiles(@Req() req: Request, @Query('parent') parentId: string): Promise<FileEntity[]> {
        try {
            return await this.fileService.getFiles(req.headers['user'].id, parentId)
        } catch (e) {
            throw e
        }

    }

}