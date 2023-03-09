import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { payrollComponentAllowanceDto } from './dto';
import { PayrollComponentAllowanceService } from './payroll-component-allowance.service';

@UseGuards(JwtAuthGuard)
@Controller('payroll-component-allowance')
export class PayrollComponentAllowanceController {
    constructor(private  payrollComponentAllowanceService:PayrollComponentAllowanceService){}

    @Post()
    async createPayrollComponentAllowance(@UserDoc() user: any ,@Res() res:Response, @Body() payrollComponentAllowance:payrollComponentAllowanceDto){
        const result = await this.payrollComponentAllowanceService.createPayrollComponentAllowance(user,payrollComponentAllowance)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Delete(":id")
    async deletePayrollComponentAllowance(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentAllowanceService.deleteOnePayrollComponentAllowance(user, id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get(":id")
    async getPayrollComponentAllowance(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentAllowanceService.findOnePayrollComponentAllowance(user,id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get()
    async getAllPayrollComponentAllowance(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.payrollComponentAllowanceService.findPayrollComponentAllowance(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Patch(":id")
    async editPayrollComponentAllowance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:payrollComponentAllowanceDto,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentAllowanceService.editPayrollComponentAllowance(user,edit,id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

}
