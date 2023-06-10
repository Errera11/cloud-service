import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction} from "express";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']
        const key = token.split(' ')[1];
        const data = this.jwtService.verify(key, {secret: process.env.SECRET_ACCESS})
        if (!data) {
            next()
            return
        }
        req.headers['user'] =  data
        next();
    }
}
