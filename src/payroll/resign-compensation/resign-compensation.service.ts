import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { PayrollComponentAllowanceService } from '../payroll-component-allowance/payroll-component-allowance.service';
import { resignCompensationDto } from './dto';
import { ResignCompensation } from './resign-compensation.model';

@Injectable()
export class ResignCompensationService {
    constructor(
        @InjectModel('ResignCompensation')private readonly resignCompensationModel: Model<ResignCompensation>,
        private payrollComponentAllowanceService: PayrollComponentAllowanceService
        ){}

    async createResignCompensation(user:any, resignCompensation: resignCompensationDto){
        console.log("s")
        const exist = await this.checkResignCompensation(user)
        if(exist){
            throw new ForbiddenException("your company already have resign compensation cannot create more than one")
        }
        let i = instanceToPlain(resignCompensation)
        if(i.components != null){
            await this.payrollComponentAllowanceService.findArrPayrollComponentAllowance(user, i.components)
        }

        i.updatedBy = user.sub
        i.company =  user.company
        const result = await this.resignCompensationModel.create(i)

        return result
    }

    async checkResignCompensation(user:any){
        const resignCompensation = await this.resignCompensationModel.findOne({company: user.company})
        if(!resignCompensation){
            return false
        }

        return true
    }

    async findResignCompensation(user:any){
        const resignCompensations = await this.resignCompensationModel.findOne({company: user.company})
        if(!resignCompensations){
            throw new NotFoundException("no resign compensation found in your company")
        }

        let result = resignCompensations.toObject()
        result.updatedAt = result.updatedAt.toLocaleString()

        return result
    }

    async editResignCompensation(user:any, resignCompensation: resignCompensationDto){
        await this.findResignCompensation(user)
        let i = instanceToPlain(resignCompensation)
        if(i.components !== null){
            await this.payrollComponentAllowanceService.findArrPayrollComponentAllowance(user,i.components)
        }
        i.updatedBy = user.sub
        i.updatedAt = Date.now()

        const result = await this.resignCompensationModel.updateOne({company:user.company}, {$set: i})
        return result
    }
}
