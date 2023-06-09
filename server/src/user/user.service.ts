import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {UserEntity} from "./User.entity";
import { v4 as uuidv4 } from 'uuid';
import {InjectModel} from "@nestjs/sequelize";
import {TokenService} from "../token/token.service";
import * as bcrypt from 'bcrypt'

type IAuthProps = {
    status: number
    message: string
} | {token: string, user: UserEntity}

@Injectable()
export class UserService {
    constructor(@InjectModel(UserEntity) private userRepository: typeof UserEntity,
                private tokenService: TokenService) {
    }

    async createUser(dto): Promise<IAuthProps> {
        const existingUser = await this.userRepository.findOne({where: {email: dto.email}})
        if(existingUser)
            throw new HttpException(`User with email ${dto.email} already exists`, HttpStatus.BAD_REQUEST)
        const randomId = uuidv4();
        const hashedPassword = await bcrypt.hash(dto.password, 3)
        const user: UserEntity = await this.userRepository.create({...dto, id: randomId, password: hashedPassword})
        const token = await this.tokenService.signToken({id: user.id, email: user.email})
        return {
            token,
            user
        }
    }

    async signIn(dto): Promise<IAuthProps> {
        const user = await this.userRepository.findOne({where: {email: dto.email}})
        if (!user)
            throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST)
        const isValidPassword = await bcrypt.compare(dto.password, user.password)
        if (!isValidPassword)
            throw new HttpException(`Invalid email or password`, HttpStatus.BAD_REQUEST)
        const token = await this.tokenService.signToken({id: user.id, email: user.email})
        return {
            token,
            user
        }
    }

}