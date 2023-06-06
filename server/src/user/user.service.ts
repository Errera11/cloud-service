import {HttpStatus, Injectable} from "@nestjs/common";
import {UserEntity} from "./User.entity";
import uuid from 'uuid';
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserEntity) private userRepository: typeof UserEntity) {}

    createUser(dto): Promise<UserEntity> {
        const id = uuid.v4();
        return this.userRepository.create({...dto, id})
    }

    async signIn(dto): Promise<any> {
        const user = await this.userRepository.findOne({where: {email: dto.email}})
        if(!user) return {status: HttpStatus.BAD_REQUEST, message: 'User not found'}
        const isValidPassword = uuid.compare(dto.password)
        if(!isValidPassword) return {status: HttpStatus.BAD_REQUEST, message: 'Email or password error'}
        return 'Successfully auth';
    }

}