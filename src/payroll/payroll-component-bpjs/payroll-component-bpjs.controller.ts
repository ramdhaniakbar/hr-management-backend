import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { payrollComponentBpjsDto } from './dto';
import { PayrollComponentBpjsService } from './payroll-component-bpjs.service';

@UseGuards(JwtAuthGuard)
@Controller('payroll-component-bpjs')
export class PayrollComponentBpjsController {
    constructor(private payrollComponentBpjsService: PayrollComponentBpjsService){}
        
    @Post()
    async createPayrollComponentBpjs(@UserDoc() user: any ,@Res() res:Response, @Body() payrollComponentBpjs:payrollComponentBpjsDto){
        const result = await this.payrollComponentBpjsService.createPayrollComponentBpjs(user, payrollComponentBpjs)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Delete(":id")
    async deletePayrollComponentBpjs(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentBpjsService.deleteOnePayrollComponentBpjs(user,id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get(":id")
    async getPayrollComponentBpjs(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentBpjsService.findOnePayrollComponentBpjs(user,id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get()
    async getAllPayrollComponentBpjs(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.payrollComponentBpjsService.findPayrollComponentBpjs(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Patch(":id")
    async editPayrollComponentBpjs(@UserDoc() user: any ,@Res() res:Response, @Body() edit:payrollComponentBpjsDto,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.payrollComponentBpjsService.editPayrollComponentBpjs(user,edit, id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }
}
