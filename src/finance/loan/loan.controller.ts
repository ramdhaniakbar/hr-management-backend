import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('loan')
export class LoanController {

    @Post('loan-name')
    async createLoanName(@UserDoc() user: any ,@Res() res:Response, @Body() loanName:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post loan name'
        })
    }

    @Delete('loan-name')
    async deleteLoanName(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete loan name'
        })
    }

    @Get('loan-name')
    async getAllLoanName(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get loan name'
        })
    }

    @Post()
    async createLoan(@UserDoc() user: any ,@Res() res:Response, @Body() loan:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post loan'
        })
    }

    @Delete()
    async deleteLoan(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'delete loan'
        })
    }

    @Get(":id")
    async getLoan(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get one loan'
        })
    }

    @Get()
    async getAllLoan(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get loan'
        })
    }

    @Patch()
    async editLoan(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch loan'
        })
    }
}
