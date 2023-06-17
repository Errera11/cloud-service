import {forwardRef, Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DbModule} from "../db/db.module";
import {UserEntity} from "./User.entity";
import {TokenModule} from "../token/token.module";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {FileService} from "../file/file.service";
import {FileModule} from "../file/file.module";
import {FileEntity} from "../file/File.entity";

@Module({
    controllers: [UserController],
    imports: [TokenModule, forwardRef(() => FileModule)],
    providers: [
        {
            provide: 'UserEntityRepository',
            useClass: UserEntity
        },
        UserService,
    ],
    exports: [UserService]
})
export class UserModule {}