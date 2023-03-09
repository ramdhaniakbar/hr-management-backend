import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { payrollComponentDeductionDto } from './dto';
import { PayrollComponentDeductionService } from './payroll-component-deduction.service';

@UseGuards(JwtAuthGuard)
@Controller('payroll-component-deduction')
export class PayrollComponentDeductionController {
    constructor(private payrollComponentDeductionService: PayrollComponentDeductionService){}

    @Post()
    async createPayrollComponentDeduction(@UserDoc() user: any ,@Res() res:Response, @Body() payrollComponentDeduction:payrollComponentDeductionDto){
        const result = await this.payrollComponentDeductionService.createPayrollComponentDeduction(user, payrollComponentDeduction)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Delete(":id")
    async deletePayrollComponentDeduction(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentDeductionService.deleteOnePayrollComponentDeduction(user, id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get(":id")
    async getPayrollComponentDeduction(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentDeductionService.findOnePayrollComponentDeduction(user,id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get()
    async getAllPayrollComponentDeduction(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.payrollComponentDeductionService.findPayrollComponentDeduction(user)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Patch(":id")
    async editPayrollComponentDeduction(@UserDoc() user: any ,@Res() res:Response, @Body() edit:payrollComponentDeductionDto,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentDeductionService.editPayrollComponentDeduction(user,edit,id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

}


