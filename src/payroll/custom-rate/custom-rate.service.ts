import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomRate } from './custom-rate.model';
import { customRateDto } from './dto';

@Injectable()
export class CustomRateService {
    constructor(@InjectModel('CustomRate')private readonly customRateModel: Model<CustomRate>){}

    async createCustomRate(user:any, customRate: customRateDto){

        const createdCustomRate = await this.customRateModel.create({
            company: user.company,
            createdBy: user.sub,
            customRateName: customRate.customRateName,
            amount: customRate.amount,
            effectiveDate: customRate.effectiveDate
        })

        return createdCustomRate
    }

    async findOneCustomRate(user:any, id:any){
        const customRate = await this.customRateModel.findById(id)
        if(!customRate){
            throw new NotFoundException("no custom rate found with the id: "+ id)
        }

        let result = customRate.toObject()
        result.createdAt = result.createdAt.toLocaleString()
        result.effectiveDate = result.effectiveDate.toLocaleString()

        return result
    }

    async findCustomRate(user:any){
        const customRates = await this.customRateModel.find({company: user.company})

        if(customRates.length == 0){
            throw new NotFoundException("no custom rate found within your company ")
        }
        let result = customRates.map((i)=>{
            return i.toObject()
        })

        result.map((i)=>{
            i.createdAt = i.createdAt.toLocaleString()
            i.effectiveDate = i.effectiveDate.toLocaleString()
        })

        return result
    }

    async deleteCustomRate(user:any, id:any){
        await this.findOneCustomRate(user,id)
        const deleteCustomRate = await this.customRateModel.deleteOne({_id:id})

        return deleteCustomRate
    }

    async editCustomRate(user:any, customRate:customRateDto, id:any){
        await this.findOneCustomRate(user,id)
        const editedCustomRate = await this.customRateModel.updateOne({_id: id}, {$set:customRate})
        return editedCustomRate
    }
    
}
