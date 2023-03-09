import { Injectable, ForbiddenException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { amountTypes, payrollPaymentScheduleModelTypes, payrollScheduleTypes } from 'src/enum';
import { CurrencyRateService } from '../currency-rate/currency-rate.service';
import { PaymentScheduleService } from '../payment-schedule/payment-schedule.service';
import { PayrollScheduleService } from '../payroll-schedule/payroll-schedule.service';
import { payrollComponentDeductionDto } from './dto';
import { PayrollComponentDeduction } from './payroll-component-dedcution.model';

@Injectable()
export class PayrollComponentDeductionService {
    constructor(
        @InjectModel('PayrollComponentDeduction')private readonly payrollComponentDeductionModel: Model<PayrollComponentDeduction>,
        private companyService: CompanyService,
        private currencyRateService: CurrencyRateService,
        private payrollScheduleService: PayrollScheduleService,
        private paymentScheduleService: PaymentScheduleService){}


    async createPayrollComponentDeduction(user:any, payrollComponentDeduction:payrollComponentDeductionDto){
        const i =instanceToPlain(payrollComponentDeduction)
        //type Monthly
        if(i.type === payrollScheduleTypes.monthly){
            if((i.default == null)|| (i.maximumAmount != null)){
                throw new ForbiddenException("payroll component with type of Monthly shouldn't have maximumAmount but should have Default")
            }
        }
        //type Daily
        if(i.type === payrollScheduleTypes.daily){
            if((i.default == null ||  i.maximumAmount == null )){
                throw new ForbiddenException("payroll component with type of Daily should have Default and maximumAmount")
            }
        }

        // type One Time
        if(i.type === payrollScheduleTypes.oneTime){
            if((i.default != null || i.maximumAmount != null)){
                throw new ForbiddenException("payroll component with type of One Time shouldn't have Default, maximumAmount")
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

        const result = await this.payrollComponentDeductionModel.create(i)
        return result
    }
    
    async deleteOnePayrollComponentDeduction(user:any, id:any){
        await this.findOnePayrollComponentDeduction(user, id)
        const result = await this.payrollComponentDeductionModel.deleteOne({_id:id})
        return result
    }

    async findOnePayrollComponentDeduction(user:any, id:any){
        const payrollComponentDeduction = await this.payrollComponentDeductionModel.findById(id)
        if(!payrollComponentDeduction){
            throw new NotFoundException("no payroll component deduction found with the id: " +id)
        }

        let result = payrollComponentDeduction.toObject()
        result.createdAt = payrollComponentDeduction.createdAt.toLocaleString()

        return result
    }

    async findPayrollComponentDeduction(user:any){
        const payrollComponentDeductions = await this.payrollComponentDeductionModel.find({company: user.company})
        if(payrollComponentDeductions.length == 0){
            throw new NotFoundException("no payroll component deduction found in this company" )
        }

        let result = payrollComponentDeductions.map((i)=>{
            return i.toObject()
        })
        result.map((i)=>{
            i.createdAt = i.createdAt.toLocaleString()
        })

        return result
    }

    async editPayrollComponentDeduction(user:any, payrollComponentDeduction: payrollComponentDeductionDto, id:any){

        await this.findOnePayrollComponentDeduction(user,id)

        const i =instanceToPlain(payrollComponentDeduction)

        //type Monthly
        if(i.type === payrollScheduleTypes.monthly){
            if((i.default == null)|| (i.maximumAmount != null)){
                throw new ForbiddenException("payroll component with type of Monthly shouldn't have maximumAmount but should have Default")
            }
        }
        //type Daily
        if(i.type === payrollScheduleTypes.daily){
            if((i.default == null ||  i.maximumAmount == null )){
                throw new ForbiddenException("payroll component with type of Daily should have Default and maximumAmount")
            }
        }
        // type One Time
        if(i.type === payrollScheduleTypes.oneTime){
            if((i.default != null || i.maximumAmount != null)){
                throw new ForbiddenException("payroll component with type of One Time shouldn't have Default, maximumAmount")
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

        const result = await this.payrollComponentDeductionModel.updateOne({_id:id},{$set: i})

        return result
    }
}
