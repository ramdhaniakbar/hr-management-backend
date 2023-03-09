import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

export class activationStrategy extends PassportStrategy(
    Strategy,
    'activation-code'
    ){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload:{sub: string,email: string, },){
        // const company = await this.companyModel.findById(payload.sub).select("_id email companyName companyLogo employeeQuota")
        // return company

        return payload
    }
}