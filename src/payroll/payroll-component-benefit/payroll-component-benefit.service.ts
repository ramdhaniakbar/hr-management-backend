import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { amountTypes, payrollPaymentScheduleModelTypes, payrollScheduleTypes } from 'src/enum';
import { CurrencyRateService } from '../currency-rate/currency-rate.service';
import { PaymentScheduleService } from '../payment-schedule/payment-schedule.service';
import { PayrollScheduleService } from '../payroll-schedule/payroll-schedule.service';
import { payrollComponentBenefitDto } from './dto';
import { PayrollComponentBenefit } from './payroll-component-benefit.model';

@Injectable()
export class PayrollComponentBenefitService {
    constructor(
        @InjectModel('PayrollComponentBenefit')private readonly payrollComponentBenefitModel: Model<PayrollComponentBenefit>,
        private companyService: CompanyService,
        private currencyRateService: CurrencyRateService,
        private payrollScheduleService: PayrollScheduleService,
        private paymentScheduleService: PaymentScheduleService
        ){}

        async createPayrollComponentBenefit(user:any, payrollComponentBenefit:payrollComponentBenefitDto){
            const i = instanceToPlain(payrollComponentBenefit)
            //type Monthly
            if(i.type === payrollScheduleTypes.monthly){
                if((i.default == null ||  i.proRate == null)|| (i.bonus != null || i.maximumAmount != null)){
                    throw new ForbiddenException("payroll component with type of Monthly shouldn't have bonus and maximumAmount but should have Default and prorate")
                }
            }
            //type Daily
            if(i.type === payrollScheduleTypes.daily){
                if((i.default == null ||  i.maximumAmount == null )|| (i.bonus != null ||i.proRate != null)){
                    throw new ForbiddenException("payroll component with type of Daily shouldn't have bonus and proRate but should have Default and maximumAmount")
                }
            }
    
            // type One Time
            if(i.type === payrollScheduleTypes.oneTime){
                if((i.bonus == null) || (i.default != null || i.proRate != null || i.maximumAmount != null)){
                    throw new ForbiddenException("payroll component with type of One Time shouldn't have Default, maximumAmount, and prorate but should have bonus")
                }
            }
    
            //general
            if(i.default == true){
                if((i.allNewEmployee == false && i.filter == null) || (i.allNewEmployee != false && i.filter != null) || i.allNewEmployee == null ){
                    throw new ForbiddenException("you should only pick allNewEmployee or filter for your default")
                }
            }
    
            if(i.maximumAmount != null){
                if(i.maximumAmount.maxAmountType === amountTypes.notUse){
                    if(i.maximumAmount.maxAmount != null){
                        throw new ForbiddenException("maximum amount type not use should not have maxAmount")
                    }
                }else{
                    if(i.maximumAmount.maxAmount == null){
                        throw new ForbiddenException("maximum amount type basic salary percentage and custom amount should have maxAmount")
                    }
                }
            }
    
            //validate filter, payrollPaymentSchedule, and currency
            if(i.filter != null){
                await this.companyService.checkFilterOrgJobLv(i.filter)
            }
            if(i.currency !== "Default"){
                await this.currencyRateService.findOneCurrencyRate(user,i.currency)
            }
            if(i.currency === "Default"){
                const defaultCurrency = await this.currencyRateService.findDefaultCurrency()
                i.currency = defaultCurrency._id
            }
    
            if(i.payrollPaymentSchedule !== "Default"){
                await this.paymentScheduleService.findOnePaymentSchedule(user,i.payrollPaymentSchedule)
                i.payrollPaymentScheduleModelType = payrollPaymentScheduleModelTypes.paymentSchedule
            }
            if(i.payrollPaymentSchedule === "Default"){
                const temp = await this.payrollScheduleService.findPayrollSchedule(user)
                console.log(temp, "temp")
                i.payrollPaymentSchedule = temp[0]._id
                i.payrollPaymentScheduleModelType = payrollPaymentScheduleModelTypes.payrollSchedule
            }
            i.createdBy = user.sub
            i.company = user.company
    
            console.log(i,"i")
            const result = await this.payrollComponentBenefitModel.create(i)
            console.log(result.maximumAmount)
            return result
        }

        async deleteOnePayrollComponentBenefit(user:any, id:any){
            await this.findOnePayrollComponentBenefit(user, id)
            const result = await this.payrollComponentBenefitModel.deleteOne({_id:id})
            return result
        }

        async findOnePayrollComponentBenefit(user:any, id:any){
            const payrollComponentBenefit = await this.payrollComponentBenefitModel.findById(id)
            if(!payrollComponentBenefit){
                throw new NotFoundException("no payroll component benefit found with the id: " +id)
            }
    
            let result = payrollComponentBenefit.toObject()
            result.createdAt = payrollComponentBenefit.createdAt.toLocaleString()
    
            return result
        }


        async findPayrollComponentBenefit(user:any){
            const payrollComponentBenefits = await this.payrollComponentBenefitModel.find({company: user.company})
            if(payrollComponentBenefits.length == 0){
                throw new NotFoundException("no payroll component allowance found in this company" )
            }
    
            let result = payrollComponentBenefits.map((i)=>{
                return i.toObject()
            })
            result.map((i)=>{
                i.createdAt = i.createdAt.toLocaleString()
            })
    
            return result
        }


        async editPayrollComponentBenefit(user:any, payrollComponentBenefit: payrollComponentBenefitDto, id:any){

            await this.findOnePayrollComponentBenefit(user,id)
    
            const i =instanceToPlain(payrollComponentBenefit)
    
            //type Monthly
            if(i.type === payrollScheduleTypes.monthly){
                if((i.default == null ||  i.proRate == null)|| (i.bonus != null || i.maximumAmount != null)){
                    throw new ForbiddenException("payroll component with type of Monthly shouldn't have bonus and maximumAmount but should have Default and prorate")
                }
            }
            //type Daily
            if(i.type === payrollScheduleTypes.daily){
                if((i.default == null ||  i.maximumAmount == null )|| (i.bonus != null ||i.proRate != null)){
                    throw new ForbiddenException("payroll component with type of Daily shouldn't have bonus and proRate but should have Default and maximumAmount")
                }
            }
            // type One Time
            if(i.type === payrollScheduleTypes.oneTime){
                if((i.bonus == null) || (i.default != null || i.proRate != null || i.maximumAmount != null)){
                    throw new ForbiddenException("payroll component with type of One Time shouldn't have Default, maximumAmount, and prorate but should have bonus")
                }
            }
    
            //general
            if(i.default == true){
                if((i.allNewEmployee == false && i.filter == null) || (i.allNewEmployee != false && i.filter != null) || i.allNewEmployee == null ){
                    throw new ForbiddenException("you should only pick allNewEmployee or filter for your default")
                }
            }
            if(i.maximumAmount != null){
                if(i.maximumAmount.maxAmountType === amountTypes.notUse){
                    if(i.maximumAmount.maxAmount != null){
                        throw new ForbiddenException("maximum amount type not use should not have maxAmount")
                    }
                }else{
                    if(i.maximumAmount.maxAmount == null){
                        throw new ForbiddenException("maximum amount type basic salary percentage and custom amount should have maxAmount")
                    }
                }
            }
    
            //validate filter, payrollPaymentSchedule, and currency
            if(i.filter != null){
                await this.companyService.checkFilterOrgJobLv(i.filter)
            }
            if(i.currency !== "Default"){
                await this.currencyRateService.findOneCurrencyRate(user,i.currency)
            }
            if(i.currency === "Default"){
                const defaultCurrency = await this.currencyRateService.findDefaultCurrency()
                i.currency = defaultCurrency._id
            }
    
            if(i.payrollPaymentSchedule !== "Default"){
                await this.paymentScheduleService.findOnePaymentSchedule(user,i.payrollPaymentSchedule)
                i.payrollPaymentScheduleModelType = payrollPaymentScheduleModelTypes.paymentSchedule
            }
            if(i.payrollPaymentSchedule === "Default"){
                const temp = await this.payrollScheduleService.findPayrollSchedule(user)
                console.log(temp, "temp")
                i.payrollPaymentSchedule = temp[0]._id
                i.payrollPaymentScheduleModelType = payrollPaymentScheduleModelTypes.payrollSchedule
            }
    
            const result = await this.payrollComponentBenefitModel.updateOne({_id:id},{$set: i})
    
            return result
        }
}
