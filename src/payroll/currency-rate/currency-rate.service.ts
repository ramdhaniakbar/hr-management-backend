import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CurrencyRate } from './currency-rate.model';
import { currencyRateDto } from './dto';

@Injectable()
export class CurrencyRateService {
    constructor(@InjectModel('CurrencyRate')private readonly currencyRateModel: Model<CurrencyRate>){}

    async createCurrencyRate(user:any, currencyRate: currencyRateDto){

        const createdCurrencyRate = await this.currencyRateModel.create({
            company: user.company,
            createdBy: user.sub,
            currencyRateName: currencyRate.currencyRateName,
            amount: currencyRate.amount,
            effectiveDate: currencyRate.effectiveDate
        })

        return createdCurrencyRate
    }

    async findOneCurrencyRate(user:any, id:any){
        const currencyRate = await this.currencyRateModel.findById(id)
        if(!currencyRate){
            throw new NotFoundException("no currency Rate found with the id: "+ id)
        }

        let result = currencyRate.toObject()
        result.createdAt = result.createdAt.toLocaleString()
        result.effectiveDate = result.effectiveDate.toLocaleString()

        return result
    }

    async findCurrencyRate(user:any){
        const currencyRates = await this.currencyRateModel.find({company: user.company})

        if(currencyRates.length == 0){
            throw new NotFoundException("no currency Rate found within your company ")
        }
        let result = currencyRates.map((i)=>{
            return i.toObject()
        })

        result.map((i)=>{
            i.createdAt = i.createdAt.toLocaleString()
            i.effectiveDate = i.effectiveDate.toLocaleString()
        })

        return result
    }

    async deleteCurrencyRate(user:any, id:any){
        await this.findOneCurrencyRate(user,id)
        const deleteCurrencyRate = await this.currencyRateModel.deleteOne({_id:id})

        return deleteCurrencyRate
    }

    async editCurrencyRate(user:any, currencyRate:currencyRateDto, id:any){
        await this.findOneCurrencyRate(user,id)
        const editedCurrencyRate = await this.currencyRateModel.updateOne({_id: id}, {$set:currencyRate})
        return editedCurrencyRate
    }

    async findDefaultCurrency(){
        const defaultCurrency = await this.currencyRateModel.findOne({company: null})
        if(!defaultCurrency){
            throw new NotFoundException("no defaul currency found")
        }
        return defaultCurrency
    }

}
