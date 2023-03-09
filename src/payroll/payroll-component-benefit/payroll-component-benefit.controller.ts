import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { payrollComponentBenefitDto } from './dto';
import { PayrollComponentBenefitService } from './payroll-component-benefit.service';

@UseGuards(JwtAuthGuard)
@Controller('payroll-component-benefit')
export class PayrollComponentBenefitController {
    constructor(private payrollComponentBenefitService: PayrollComponentBenefitService){}
    
    @Post()
    async createPayrollComponentBenefit(@UserDoc() user: any ,@Res() res:Response, @Body() payrollComponentBenefit:payrollComponentBenefitDto){
        const result = await this.payrollComponentBenefitService.createPayrollComponentBenefit(user, payrollComponentBenefit)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Delete(":id")
    async deletePayrollComponentBenefit(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentBenefitService.deleteOnePayrollComponentBenefit(user,id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get(":id")
    async getPayrollComponentBenefit(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentBenefitService.findOnePayrollComponentBenefit(user,id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get()
    async getAllPayrollComponentBenefit(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.payrollComponentBenefitService.findPayrollComponentBenefit(user)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Patch(":id")
    async editPayrollComponentBenefit(@UserDoc() user: any ,@Res() res:Response, @Body() edit:payrollComponentBenefitDto, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentBenefitService.editPayrollComponentBenefit(user, edit, id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }
}
