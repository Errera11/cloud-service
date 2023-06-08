import {HttpStatus, Inject, Injectable} from "@nestjs/common";
import {UserEntity} from "./User.entity";
import { v4 as uuidv4 } from 'uuid';
import {InjectModel} from "@nestjs/sequelize";
import {TokenService} from "../token/token.service";
import * as bcrypt from 'bcrypt'

interface ICreateUserReturnType {
    token: string,
    user: UserEntity
}

type ISignInReturnType = {
    status: number
    message: string
} | {token: string, user: UserEntity}

@Injectable()
export class UserService {
    constructor(@InjectModel(UserEntity) private userRepository: typeof UserEntity,
                private tokenService: TokenService) {
    }

    async createUser(dto): Promise<ICreateUserReturnType> {
        const randomId = uuidv4();
        const hashedPassword = await bcrypt.hash(dto.password, 3)
        const user: UserEntity = await this.userRepository.create({...dto, id: randomId, password: hashedPassword})
        const token = await this.tokenService.signToken({id: user.id, email: user.email})
        return {
            token,
            user
        }
    }

    async signIn(dto): Promise<ISignInReturnType> {
        const user = await this.userRepository.findOne({where: {email: dto.email}})
        if (!user) return {status: HttpStatus.BAD_REQUEST, message: 'User not found'}
        const isValidPassword = bcrypt.compare(dto.password, user.password)
        if (!isValidPassword) return {status: HttpStatus.BAD_REQUEST, message: 'Email or password error'}
        const token = await this.tokenService.signToken({id: user.id, email: user.email})
        return {
            token,
            user
        }
    }

}