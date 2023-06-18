import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Query,
    Req,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {FileDto} from "./dto/File.Dto";
import {FileService} from "./file.service";
import {FileEntity} from "./File.entity";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {
    }

    @Post('')
    async createDir(@Req() req: Request, @Body() file: FileDto): Promise<FileEntity> {
        try {
            return await this.fileService.createDir({...file, userId: req.headers['user'].id})
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

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createFile(@Req() req: Request, @UploadedFile() file, @Body('parent') parent: string) {
        try {
            return await this.fileService.createFile(file, req.headers['user'].id,  parent);
        } catch (e) {
            console.log(e);
            throw e
        }
    }

}