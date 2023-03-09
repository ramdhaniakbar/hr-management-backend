import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Company } from "src/company/model";

export class JwtCompany extends PassportStrategy(
    Strategy,
    'comp'
    ){

    constructor(@InjectModel('Company')private readonly companyModel: Model<Company>){
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