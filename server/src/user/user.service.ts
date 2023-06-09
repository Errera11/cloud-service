import {
    BadRequestException,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from "@nestjs/common";
import {UserEntity} from "./User.entity";
import {v4 as uuidv4} from 'uuid';
import {InjectModel} from "@nestjs/sequelize";
import {TokenService} from "../token/token.service";
import * as bcrypt from 'bcrypt'
import {FileService} from "../file/file.service";
import * as path from 'path';
import * as fs from 'fs'

type IAuthProps = {
    status: number
    message: string
} | { token: string, user: UserEntity }

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserEntity) private userRepository: typeof UserEntity,
        private tokenService: TokenService,
        @Inject(forwardRef(() => FileService)) private fileService: FileService) {
    }

    async createUser(dto): Promise<IAuthProps> {
        const existingUser = await this.userRepository.findOne({where: {email: dto.email}})
        if (existingUser)
            throw new HttpException(`User with email ${dto.email} already exists`, HttpStatus.BAD_REQUEST)
        const randomId = uuidv4();
        const hashedPassword = await bcrypt.hash(dto.password, 3)
        const user: UserEntity = await this.userRepository.create({...dto, id: randomId, password: hashedPassword})
        const token = await this.tokenService.signToken({id: user.id, email: user.email})
        this.fileService.createDir({userId: user.id, path: '', type: 'user reg'})
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

    findUserById(id: string): Promise<UserEntity> {
        return this.userRepository.findOne({where: {id}})
    }

    async auth(userData) {
        const dbUser = await this.findUserById(userData.id)
        if (!dbUser) throw UnauthorizedException
        const token = await this.tokenService.signToken({email: userData.email, id: userData.id})
        return {
            user: dbUser,
            token
        }
    }

    updateUser(id, data) {
        return this.userRepository.update({...data}, {where: {id}, returning: true})
    }

    async uploadUserImage(id, image) {
        try {
            const imageName = uuidv4()
            const staticPath = path.join(...process.env.STATIC_PATH.split('/'))
            const imagePath = path.join(staticPath, imageName)
            if(!fs.existsSync(imagePath)) {
                fs.writeFileSync(imagePath, image.buffer)
            } else {
                throw new BadRequestException()
            }
            await this.userRepository.update({image: imageName}, {where: {id}})
            return imageName;
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    async deleteImage(id) {
        try {
            const user = await this.userRepository.findOne({where: {id}})
            fs.unlinkSync(path.join(...process.env.STATIC_PATH.split('/'), user.image))
            user.update({image: ''}, {where: {id}})
            user.save()
            return user
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException()
        }

    }

}