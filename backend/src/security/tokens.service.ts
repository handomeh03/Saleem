import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class tokenService{
    constructor(private readonly jwtService:JwtService){}

    async generateAccessToken(data: {userId:number,RoleName:string}) {
        const payload = { sub: data.userId, role: data.RoleName };
        return await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: process.env.ACCESSTOKEN
        });
    }

    async VerifyAccessToken(token:string){
       return await this.jwtService.verifyAsync(token,{
        secret:process.env.ACCESSTOKEN
       })
    }
}