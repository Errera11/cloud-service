import {Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {NextFunction} from "express";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}
    use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers['authorization']
            if(!token) {
                throw 'unauth';
            }
            const key = token.split(' ')[1];
            const data = this.jwtService.verify(key, {secret: process.env.SECRET_ACCESS})
            if (!data) {
                throw 'unauth';
            }
            req.headers['user'] =  data
            next();
        } catch (e) {
            throw new UnauthorizedException()
        }

    }
}
