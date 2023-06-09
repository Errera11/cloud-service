import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DbModule} from "../db/db.module";
import {UserEntity} from "./User.entity";
import {TokenModule} from "../token/token.module";

@Module({
    controllers: [UserController],
    imports: [DbModule, TokenModule],
    providers: [UserService,
        {
        provide: 'UserEntityRepository',
        useValue: UserEntity},
    ],
})
export class UserModule {}