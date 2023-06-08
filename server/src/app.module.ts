import {Module} from "@nestjs/common";
import {DbModule} from "./db/db.module";
import {UserModule} from "./user/user.module";
import { TokenModule } from './token/token.module';

@Module({
    imports: [
        UserModule,
        TokenModule,
        DbModule
    ],
})
export class AppModule {}