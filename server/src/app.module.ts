import {Module} from "@nestjs/common";
import {DbModule} from "./db/db.module";
import {UserModule} from "./user/user.module";
import { TokenModule } from './token/token.module';
import {FileModule} from "./file/file.module";

@Module({
    imports: [
        UserModule,
        TokenModule,
        DbModule,
        FileModule
    ],
})
export class AppModule {}