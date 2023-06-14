import {BadRequestException, Body, Controller, Get, Post, Query, Req} from "@nestjs/common";
import {FileDto} from "./dto/File.Dto";
import {FileService} from "./file.service";

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('')
    async createFile(@Req() req: Request, @Body() file: FileDto) {
        try {
            return await this.fileService.createFile({...file, userId: req.headers['user'].id})
        } catch (e) {
            throw new BadRequestException('File already exists');
        }

    }

    @Get('')
    async getFiles(@Req() req: Request, @Query('parent') parentId: string) {
        try {
            return await this.fileService.getFiles(req.headers['user'].id, parentId)
        } catch (e) {
            throw e
        }

    }

}