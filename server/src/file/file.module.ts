import {forwardRef, Inject, Module} from "@nestjs/common";
import {FileService} from "./file.service";
import {FileEntity} from "./File.entity";
import {FileController} from "./file.controller";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/User.entity";
import {TokenModule} from "../token/token.module";
import {TokenService} from "../token/token.service";
import {DbModule} from "../db/db.module";


@Module({
    imports: [forwardRef(() => UserModule)],
    providers: [
        {
            provide: 'FileEntityRepository',
            useValue: FileEntity
        }, FileService],
    controllers: [FileController],
    exports: [FileService, ]
})
export class FileModule {
}