import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule} from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt"; 
import { JwtStrategy,JwtCompany, activationStrategy } from "./strategy";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/users/user.model";
import { CompanyModule } from "src/company/company.module";
import { CompanySchema } from "src/company/model";

@Module({
    imports: [forwardRef(()=>CompanyModule) , forwardRef(()=>UserModule), PassportModule,MongooseModule.forFeature([{ name: 'User', schema: UserSchema},{name: 'Company', schema: CompanySchema}]),  JwtModule.register({
        secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 6000,
      },
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy,JwtCompany,activationStrategy],
    exports: [AuthService]
})
export class AuthModule{}