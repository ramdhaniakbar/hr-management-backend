import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('transaction-update-payroll')
export class TransactionUpdatePayrollController {
                
    @Post()
    async createTransactionUpdatePayroll(@UserDoc() user: any ,@Res() res:Response, @Body() transactionUpdatePayroll:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Transaction Update Payroll'
        })
    }

    @Delete()
    async deleteTransactionUpdatePayroll(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete Transaction Update Payroll'
        })
    }

    @Get(":id")
    async getTransactionUpdatePayroll(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Transaction Update Payroll'
        })
    }

    @Get()
    async getAllTransactionUpdatePayroll(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get all Transaction Update Payroll in company'
        })
    }

    @Patch()
    async editTransactionUpdatePayroll(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Transaction Update Payroll'
        })
    }
}
