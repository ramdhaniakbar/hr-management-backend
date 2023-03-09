import { Injectable, ForbiddenException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { PayrollComponentAllowanceService } from '../payroll-component-allowance/payroll-component-allowance.service';
import { payrollComponentBpjsDto } from './dto';
import { PayrollComponentBpjs } from './payroll-component-bpjs.model';

@Injectable()
export class PayrollComponentBpjsService {

    constructor(
        @InjectModel('PayrollComponentBpjs')private readonly payrollComponentBpjsModel: Model<PayrollComponentBpjs>,
        private payrollComponentAllowanceService: PayrollComponentAllowanceService){}

    async createPayrollComponentBpjs(user:any, payrollComponentBpjs: payrollComponentBpjsDto){
        const i =instanceToPlain(payrollComponentBpjs)
        
        if(i.normalCalculation == false){
            throw new ForbiddenException("formula is not available yet")
        }

        await this.payrollComponentAllowanceService.findArrPayrollComponentAllowance(user, i.payrollComponentIncluded)

        i.createdBy= user.sub
        i.company= user.company

        const result = await this.payrollComponentBpjsModel.create(i)
        return result 
    }

    async deleteOnePayrollComponentBpjs(user:any, id:any){
        await this.findOnePayrollComponentBpjs(user,id)
        const result = await this.payrollComponentBpjsModel.deleteOne({_id:id})

        return result
    }

    async findOnePayrollComponentBpjs(user:any, id:any){
        const payrollComponentBpjs = await this.payrollComponentBpjsModel.findById(id)

        if(!payrollComponentBpjs){
            throw new NotFoundException("no payroll component BPJS found with the id: " +id)
        }

        let result = payrollComponentBpjs.toObject()
        result.createdAt = result.createdAt.toLocaleString()

        return result
    }

    async findPayrollComponentBpjs(user:any){
        const payrollComponentBpjses = await this.payrollComponentBpjsModel.find({company:user.company})
        if(payrollComponentBpjses.length == 0){
            throw new NotFoundException("no payroll component bpjs found in this company" )
        }

        let result = payrollComponentBpjses.map((i)=>{
            return i.toObject()
        })

        result.map((i)=>{
            i.createdAt = i.createdAt.toLocaleString()
        })

        return result
    }

    async editPayrollComponentBpjs(user:any, payrollComponentBpjs: payrollComponentBpjsDto, id:any){
        await this.findOnePayrollComponentBpjs(user,id)

        const i =instanceToPlain(payrollComponentBpjs)
        if(i.normalCalculation == false){
            throw new ForbiddenException("formula is not available yet")
        }
        await this.payrollComponentAllowanceService.findArrPayrollComponentAllowance(user, i.payrollComponentIncluded)

        const result = await this.payrollComponentBpjsModel.updateOne({_id: id}, {$set: i})

        return result
    }
}
