import {Injectable} from "@nestjs/common";
import {UserEntity} from "./User.entity";
import {v4 as uuid} from 'uuid';
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserEntity) private userRepository: typeof UserEntity) {}

    createUser(dto): Promise<UserEntity> {
        const id = uuid();
        return this.userRepository.create({...dto, id})
    }

}