import {forwardRef, Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {UserEntity} from "./User.entity";
import {TokenModule} from "../token/token.module";
import {FileModule} from "../file/file.module";
import {FileService} from "../file/file.service";
import {DbModule} from "../db/db.module";

@Module({
    controllers: [UserController],
    imports: [TokenModule, forwardRef(() => FileModule)],
    providers: [
        {
            provide: 'UserEntityRepository',
            useValue: UserEntity
        },
        UserService
    ],
    exports: [UserService, ]
})
export class UserModule {}