import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { UserDoc } from "src/users/custom-decorator";
import { JwtAuthGuard } from "./auth-guard";
import { AuthService } from "./auth.service";
import {AccountActivationDto, AuthDto, companyDto, signinDto} from "./dto"



@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signUp')
    async signup(@Res() res: Response, @Body() authDto: AuthDto){
        const newUser = await this.authService.signup(authDto)
        return res.status(HttpStatus.OK).json({
            message: 'user has been created successfully',
            access_token: newUser
        })

    }

    @Post('signin')
    async signin(@Body() signinDto: signinDto){
        return this.authService.signin(signinDto)
    }

    @Post('signup/company')
    async companySignup(@Body() companyDto: companyDto, @Res() res:Response){
        
        const company = await this.authService.signupCompany(companyDto);
        return res.status(HttpStatus.OK).json({
            message: 'company has been created successfully',
            company: company
        })
    }

    @Post('signIn/company')
    async companySignIn(@Body() signinDto: signinDto){
        return await this.authService.signInCompany(signinDto)
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('activate-account')
    async activateAccount(@Res() res: Response, @UserDoc() user:any, @Body() account:AccountActivationDto){
        const result = await this.authService.activateAccount(account)

        return res.status(HttpStatus.OK).json(result)
    }
}