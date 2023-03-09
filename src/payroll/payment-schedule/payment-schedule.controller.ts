import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { paymentScheduleDto } from './dto';
import { PaymentScheduleService } from './payment-schedule.service';

@UseGuards(JwtAuthGuard)
@Controller('payment-schedule')
export class PaymentScheduleController {

    constructor(private paymentScheduleService: PaymentScheduleService){}

    @Post()
    async createPaymentSchedule(@UserDoc() user: any ,@Res() res:Response, @Body() paymentSchedule:paymentScheduleDto){
        const result = await this.paymentScheduleService.createPaymentSchedule(user,paymentSchedule)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Delete(":id")
    async deletePaymentSchedule(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.paymentScheduleService.deleteOnePaymentSchedule(user,id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get(":id")
    async getPaymentSchedule(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.paymentScheduleService.findOnePaymentSchedule(user, id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get()
    async getAllPaymentSchedule(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.paymentScheduleService.findPaymentSchedule(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Patch(":id")
    async editPaymentSchedule(@UserDoc() user: any ,@Res() res:Response, @Body() edit:paymentScheduleDto, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.paymentScheduleService.editPaymentSchedule(user,edit, id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }


}
