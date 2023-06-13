import {Body, Controller, Post, Req} from "@nestjs/common";
import {FileDto} from "./dto/File.Dto";
import {FileService} from "./file.service";

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {
    }

    @Post('')
    async createDir(@Req() req: Request, @Body() file: FileDto) {
        return this.fileService.createDir({...file, userId: req.headers['user'].id})
    }

}