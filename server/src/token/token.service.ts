import { Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}
    signToken(payload: {id: string, email: string}) {
        return this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_ACCESS
        });

    }
}
