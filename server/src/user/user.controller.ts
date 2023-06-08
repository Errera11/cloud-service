import {Body, Controller, Inject, Post} from "@nestjs/common";
import {CreateUserDto} from "./types/userTypes";
import {UserService} from "./user.service";


@Controller('/user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/signUp')
    async createUser(@Body() dto: CreateUserDto): Promise<any> {
        return await this.userService.createUser(dto)
    }

    @Post('/signIn')
    async signIn(@Body() dto: CreateUserDto) {
        return await this.userService.signIn(dto)
    }
}