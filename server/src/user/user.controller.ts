import {Body, Controller, HttpException, Inject, Post} from "@nestjs/common";
import {CreateUserDto} from "./types/userTypes";
import {UserService} from "./user.service";


@Controller('/user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/signUp')
    async createUser(@Body() dto: CreateUserDto): Promise<any> {
        try {
            return await this.userService.createUser(dto)
        } catch (e) {
            throw e
        }

    }

    @Post('/signIn')
    async signIn(@Body() dto: CreateUserDto) {
        try {
            return await this.userService.signIn(dto)
        } catch (e) {
            throw e
        }

    }
}