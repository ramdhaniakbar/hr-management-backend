import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { checkAbility } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
import { AbilityGuard } from 'src/ability/ability.guard';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { payrollScheduleDto } from './dto';
import { PayrollScheduleService } from './payroll-schedule.service';

@UseGuards(JwtAuthGuard)
@Controller('payroll-schedule')
export class PayrollScheduleController {
    constructor(
        private readonly payrollScheduleService: PayrollScheduleService
        ){}
    
    @UseGuards(AbilityGuard)
    @checkAbility({ action: Action.Create, subject: 'payroll-schedule' })
    @Post()
    async createPayrollSchedule(@UserDoc() user: any ,@Res() res:Response, @Body() payrollSchedule:payrollScheduleDto){
        const result = await this.payrollScheduleService.createPayrollSchedule(user, payrollSchedule)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    // @Delete()
    // async deletePayrollSchedule(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete  Payroll Schedule'
    //     })
    // }

    // @Get(":id")
    // async getPayrollSchedule(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Get One Payroll Schedule'
    //     })
    // }

    @UseGuards(AbilityGuard)
    @checkAbility({ action: Action.Read, subject: 'payroll-schedule' })
    @Get()
    async getPayrollSchedule(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.payrollScheduleService.findPayrollSchedule(user)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @UseGuards(AbilityGuard)
    @checkAbility({ action: Action.Update, subject: 'payroll-schedule' })
    @Patch()
    async editPayrollSchedule(@UserDoc() user: any ,@Res() res:Response, @Body() edit:payrollScheduleDto){
        const result = await this.payrollScheduleService.editPayrollSchedule(user, edit)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

}
