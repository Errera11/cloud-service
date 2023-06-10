import {MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DbModule} from "../db/db.module";
import {UserEntity} from "./User.entity";
import {TokenModule} from "../token/token.module";
import {AuthMiddleware} from "../middlewares/auth.middleware";

@Module({
    controllers: [UserController],
    imports: [DbModule, TokenModule],
    providers: [UserService,
        {
        provide: 'UserEntityRepository',
        useValue: UserEntity},
    ],
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes("user/auth")

    }
}