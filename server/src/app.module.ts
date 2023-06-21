import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {DbModule} from "./db/db.module";
import {UserModule} from "./user/user.module";
import { TokenModule } from './token/token.module';
import {FileModule} from "./file/file.module";
import {AuthMiddleware} from "./middlewares/auth.middleware";

@Module({
    imports: [
        UserModule,
        TokenModule,
        DbModule,
        FileModule
    ],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes("user/auth", "file", "file/create", "file/delete")

    }
}