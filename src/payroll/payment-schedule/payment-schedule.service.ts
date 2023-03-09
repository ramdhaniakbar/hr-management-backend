import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { paymentScheduleTypes } from 'src/enum';
import { PayrollScheduleService } from '../payroll-schedule/payroll-schedule.service';
import { paymentScheduleDto } from './dto';
import { PaymentSchedule } from './payment-schedule.model';

@Injectable()
export class PaymentScheduleService {
    constructor(
        @InjectModel('PaymentSchedule')private readonly paymentScheduleModel: Model<PaymentSchedule>,
        private payrollScheduleService: PayrollScheduleService
    ){}

    async createPaymentSchedule(user:any, paymentSchedule: paymentScheduleDto){

        let i = instanceToPlain(paymentSchedule)
        if(i.paymentScheduleType == paymentScheduleTypes.monthly){
            if((i.attendance == null || i.payroll == null || i.attendancePayLastMonth == null) ||(i.startDate != null || i.cutOffDay != null)){
                throw new ForbiddenException(" payment schedule type of monthly shouldn't have start date and cut off day, but should have attendance, payroll, and attendancePayLastMonth")
            }
        }
        if(i.paymentScheduleType == paymentScheduleTypes.weekly){
            if((i.attendance != null || i.payroll != null || i.attendancePayLastMonth != null) || (i.startDate == null || i.cutOffDay == null) ){
                throw new ForbiddenException(" payment schedule type of weekly shouldn't have attendance, payroll, attendancePayLastMonth, but should have startDate and cutOffDay")
            }
        }

        if(i.parentSchedule == "Default"){
            const temp = await this.payrollScheduleService.findPayrollSchedule(user)
            i.parentSchedule = temp[0]._id
        }else{
            await this.findOnePaymentSchedule(user ,i.parentSchedule)
        }

        i.createdBy = user.sub,
        i.company = user.company
        const result = await this.paymentScheduleModel.create(i)
        
        return result
    }

    async findOnePaymentSchedule(user:any, id:any){
        const paymentSchedule = await this.paymentScheduleModel.findById(id)

        if(!paymentSchedule){
            throw new NotFoundException("no payment schedule found with the id: "+ id)
        }
        let result = paymentSchedule.toObject()
        if(result.paymentScheduleType === paymentScheduleTypes.weekly){
            result.startDate = result.startDate.toLocaleString() 
        }
        result.createdAt = result.createdAt.toLocaleString()
        return result
    }

    async findPaymentSchedule(user: any){
        const paymentSchedules = await this.paymentScheduleModel.find({company: user.company})
        if(paymentSchedules.length == 0){
            throw new NotFoundException("no payment schedule found from your company")
        }

        let result = paymentSchedules.map((i)=>{
            return i.toObject()
        })

        result.map((i)=>{
            i.createdAt = i.createdAt.toLocaleString()
            if(i.paymentScheduleType === paymentScheduleTypes.weekly){
                i.startDate = i.startDate.toLocaleString() 
            }
        })
        return result
    }
    async deleteOnePaymentSchedule(user:any, id:any){
        await this.findOnePaymentSchedule(user, id)
        const deletedPaymentSchedule = await this.paymentScheduleModel.deleteOne({_id: id})
        return deletedPaymentSchedule
    }

    async editPaymentSchedule(user:any, paymentSchedule: paymentScheduleDto,id:any){
        await this.findOnePaymentSchedule(user,id)

        let i = instanceToPlain(paymentSchedule)
        if(i.paymentScheduleType == paymentScheduleTypes.monthly){
            if((i.attendance == null || i.payroll == null || i.attendancePayLastMonth == null) ||(i.startDate != null || i.cutOffDay != null)){
                throw new ForbiddenException(" payment schedule type of monthly shouldn't have start date and cut off day, but should have attendance, payroll, and attendancePayLastMonth")
            }
        }
        if(i.paymentScheduleType == paymentScheduleTypes.weekly){
            if((i.attendance != null || i.payroll != null || i.attendancePayLastMonth != null) || (i.startDate == null || i.cutOffDay == null) ){
                throw new ForbiddenException(" payment schedule type of weekly shouldn't have attendance, payroll, attendancePayLastMonth, but should have startDate and cutOffDay")
            }
        }

        if(i.parentSchedule == "Default"){
            const temp = await this.payrollScheduleService.findPayrollSchedule(user)
            i.parentSchedule = temp[0]._id
        }else{
            await this.findOnePaymentSchedule(user ,i.parentSchedule)
        }

        const result = await this.paymentScheduleModel.updateOne({_id: id}, {$set: i})

        return result

    }
}
