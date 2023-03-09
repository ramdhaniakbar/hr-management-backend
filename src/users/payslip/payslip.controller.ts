import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('payslip')
export class PayslipController {
    
    // @Post()
    // async createPayslip(@UserDoc() user: any ,@Res() res:Response, @Body() payslip:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Post Payslip'
    //     })
    // }

    // @Delete()
    // async deletePayslip(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Payslip'
    //     })
    // }

    @Get(":id")
    async getPayslip(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Payslip'
        })
    }

    // @Get()
    // async getAllPayslip(@UserDoc() user: any ,@Res() res:Response){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Get All Payslip in company'
    //     })
    // }

    // @Patch()
    // async editPayslip(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Patch Payslip'
    //     })
    // }

}
