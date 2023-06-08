import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DbModule} from "../db/db.module";
import {UserEntity} from "./User.entity";
import {TokenModule} from "../token/token.module";
import {TokenService} from "../token/token.service";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [UserController],
    imports: [DbModule, TokenModule],
    providers: [UserService,
        TokenService,
        JwtService,
        {
        provide: 'UserEntityRepository',
        useValue: UserEntity},

    ],
})
export class UserModule {}