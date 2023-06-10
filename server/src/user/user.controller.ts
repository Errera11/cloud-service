import {Body, Controller, Get, HttpException, HttpStatus, Post, Headers} from "@nestjs/common";
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

    @Get("auth")
    async auth(@Headers() headers) {
        try {
            const user: {id: string, email: string} = headers.user
            return await this.userService.auth(user)
        } catch (e) {
            throw e
        }

    }
}