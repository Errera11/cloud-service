import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DbModule} from "../db/db.module";
import {UserEntity} from "./User.entity";


@Module({
    controllers: [UserController],
    imports: [DbModule],
    providers: [UserService, {
        provide: 'UserEntityRepository',
        useValue: UserEntity}],
})
export class UserModule {}