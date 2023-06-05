import {Module} from "@nestjs/common";
import {DbModule} from "./db/db.module";
import {UserModule} from "./user/user.module";

@Module({
    imports: [
        UserModule
    ],
})
export class AppModule {}