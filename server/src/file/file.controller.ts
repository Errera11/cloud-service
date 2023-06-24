import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    Post,
    Query,
    Req, StreamableFile,
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
            console.log(file);
            return await this.fileService.createDir({...file, userId: req.headers['user'].id})
        } catch (e) {
            console.log(e);
            throw new BadRequestException('File already exists');
        }

    }

    @Get('')
    async getFiles(@Query('sort') sort, @Req() req: Request, @Query('parent') parentId: string): Promise<FileEntity[]> {
        try {
            return await this.fileService.getFiles(req.headers['user'].id, parentId, sort)
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

    @Get('download')
    async downloadFile(@Query('id') id: string, @Req() req: Request) {
        const file = await this.fileService.downloadFile(req.headers['user'].id, id)
        return new StreamableFile(file)
    }

    @Delete('delete')
    async deleteFile(@Query('id') id: string) {
        return await this.fileService.deleteFile(id)
    }
}