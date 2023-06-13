import {Module} from "@nestjs/common";
import {FileService} from "./file.service";
import {FileEntity} from "./File.entity";
import {FileController} from "./file.controller";


@Module({
    providers: [{
        provide: 'FileEntityRepository',
        useValue: FileEntity
    }, FileService, ],
    controllers: [FileController],

})
export class FileModule{}