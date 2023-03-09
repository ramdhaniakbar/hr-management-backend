import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { User } from "src/users/user.model";


export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
    ){

    constructor(@InjectModel('User')private readonly userModel: Model<User>,){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload:{sub: string,email: string },){
        // const user = await this.userModel.findById(payload.sub).select("-password")
        // return user
        return payload;
    }
}