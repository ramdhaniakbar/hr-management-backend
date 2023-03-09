import { ForbiddenException, Injectable, forwardRef, Inject } from "@nestjs/common";
import { User } from "../users/user.model";
import { AccountActivationDto, AuthDto, companyDto, signinDto } from "./dto";
import { SuperadminDto } from "src/company/dto";
import * as argon from 'argon2'
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Company } from "../company/model"
import { UserService } from "src/users/users.service";
import { createdByTypes } from "src/enum";



@Injectable()
export class AuthService{

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                @InjectModel('Company') private readonly companyModel: Model<Company>,
                private jwtService: JwtService,
                @Inject(forwardRef(() =>UserService))
                private userService: UserService){}


    async signup(authDto: AuthDto){
        
        // const hash = await argon.hash(authDto.password)


        const tempUser = {email: authDto.email, password: authDto.password, name: authDto.name}
        try{
            const newUser = new this.userModel(tempUser)
            await newUser.save()
        }catch(err){
            if(err.code == 11000){
                throw new ForbiddenException("email must be unique ", err)
            }
        }

    }

    async signupSuper(superDto: SuperadminDto, companyDoc:any){
        // const hash = await argon.hash(superDto.password)
        const tempUser = {
                            email: superDto.email, 
                            password: {
                                password: superDto.password,
                                passwordChangedBy: companyDoc.sub
                            },
                            model_type: createdByTypes.company,
                            createdBy: companyDoc.sub,
                            name: superDto.name, 
                            phoneNo: superDto.phoneNo, 
                            company: companyDoc.sub
                        }
        try{
            const newUser = new this.userModel(tempUser)
            await newUser.save()
            newUser.populate('company')
            return newUser;
        }catch(err){
            if(err.code == 11000){
                throw new ForbiddenException("email must be unique ", err)
            }
        }

    }

    async signToken(userId: string,email: string, company: any, jobLevel: any, organization: any): Promise<{access_token: string}>{
        const payload ={sub: userId,email, company, jobLevel, organization}
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '5h',
            secret: jwtConstants.secret
        })

        return{access_token: token,}
    }

    async signTokenCompany(userId: string, email: string): Promise<{access_token: string}>{
        const payload ={sub: userId,email }
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '5h',
            secret: jwtConstants.secret
        })

        return{access_token: token,}
    }

    async signActivationToken(user:any): Promise<{activation_token: string}>{
        const payload = {_id: user._id, email: user.email}
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '24h',
            secret: jwtConstants.secret
        })

        return{activation_token: token,}
    }

    async signin(signDto: signinDto){
        const user = await this.userModel.findOne({email: signDto.email})
        if(!user){
            throw new ForbiddenException("the email doesn't exist")
        }else if(!user.company){
            throw new ForbiddenException("the user has yet to be registered into a company")
        }
        const validatePassword = await argon.verify(user.password.password, signDto.password)

        if(!validatePassword){
            throw new ForbiddenException("the password does not match the email")
        }
        return this.signToken(user._id, user.email, user.company, user.jobLevel, user.organization)
    }

    async signupCompany(compDto: companyDto){
        // const hash = await argon.hash(compDto.password)
        
        const tempCompany = {
                            email: compDto.email, 
                            password: compDto.password, 
                            companyName: compDto.companyName, 
                            companyPhoneNumber: compDto.companyPhoneNumber, 
                            companyAddress: compDto.companyAddress, 
                            picEmail: compDto.picEmail, 
                            picPhoneNumber: compDto.picPhoneNumber
                        }

                        try{
                            const newCompany = new this.companyModel(tempCompany)
                            const result = await newCompany.save();
                            return result
                        }
                        catch(err){
                            if(err.code == 11000){
                                console.log(err)
                                throw new ForbiddenException("company email must be unique ", err)
                            }
                        }
    }

    async signInCompany(companyDto: signinDto){
        const company = await this.companyModel.findOne({email: companyDto.email})
        if(!company){
            throw new ForbiddenException("the email doesn't exist")
        }
        const validatePassword = await argon.verify(company.password, companyDto.password)

        if(!validatePassword){
            throw new ForbiddenException("the password does not match the email")
        }
        return this.signTokenCompany(company._id, company.email)
    }

    async activateAccount(account: AccountActivationDto){
        const user = await this.userService.getOneUserId(account._id)
        if(user.email !== account.email){
            throw new ForbiddenException("the email is not the same email as the user's")
        }
        if(user.password){
            throw new ForbiddenException("the account already active")
        }
        return this.signActivationToken(user)
    }
}