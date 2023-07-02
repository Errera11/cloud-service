import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {DbModule} from "./db/db.module";
import {UserModule} from "./user/user.module";
import { TokenModule } from './token/token.module';
import {FileModule} from "./file/file.module";
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(...process.env.STATIC_PATH.split('/')),
        }),
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
            .forRoutes("user/auth", "file", "file/create", "file/delete", "user/image")

    }
}