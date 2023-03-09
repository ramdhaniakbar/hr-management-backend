import { Injectable, ForbiddenException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { payrollScheduleDto } from './dto';
import { PayrollSchedule } from './payroll-schedule.model';

@Injectable()
export class PayrollScheduleService {
    
    constructor(@InjectModel('PayrollSchedule')private readonly payrollScheduleModel: Model<PayrollSchedule>){}
    
    async createPayrollSchedule(user:any, payrollSchedule: payrollScheduleDto){
        const alreadyExist = await this.checkPayrollSchedule(user)
        if(alreadyExist){
            throw new ForbiddenException("your company already have a payroll schedule, can't create another one")
        }
        const createdPayrollSchedule = await this.payrollScheduleModel.create({
            company: user.company,
            payrollSchedule: payrollSchedule.payrollSchedule,
            updatedBy: user.sub,
        })

        return createdPayrollSchedule
    }

    async findPayrollSchedule(user:any){
        const payrollSchedule = await this.payrollScheduleModel.find({company:user.company})
        if(payrollSchedule.length == 0){
            throw new NotFoundException("no payroll schedule found within your company")
        }
        let result = payrollSchedule.map((i)=>{
            return i.toObject()
        })
        result.map((i)=>{
            i.updatedAt = i.updatedAt.toLocaleString()
        })

        return result
    }

    async checkPayrollSchedule(user:any){
        const result = await this.payrollScheduleModel.find({company:user.company})
        if(result.length == 0){
            return false
        }
        return true
    }


    async editPayrollSchedule(user:any, edit: payrollScheduleDto){
        await this.findPayrollSchedule(user)

        const result = await this.payrollScheduleModel.updateOne({company: user.company}, {
            $set:{
                payrollSchedule: edit.payrollSchedule,
                updatedBy: user.sub,
                updatedAt: Date.now(),
            }
        })

        return result
    }
}
