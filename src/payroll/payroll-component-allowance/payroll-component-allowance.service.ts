import { ForbiddenException,NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { amountTypes, payrollPaymentScheduleModelTypes, payrollScheduleTypes } from 'src/enum';
import { CurrencyRateService } from '../currency-rate/currency-rate.service';
import { PaymentScheduleService } from '../payment-schedule/payment-schedule.service';
import { PayrollScheduleService } from '../payroll-schedule/payroll-schedule.service';
import { payrollComponentAllowanceDto } from './dto';
import { PayrollComponentAllowance } from './payroll-component-allowance.model';

@Injectable()
export class PayrollComponentAllowanceService {
    constructor(
        @InjectModel('PayrollComponentAllowance')private readonly payrollComponentAllowanceModel: Model<PayrollComponentAllowance>,
        private companyService: CompanyService,
        private currencyRateService: CurrencyRateService,
        private payrollScheduleService: PayrollScheduleService,
        private paymentScheduleService: PaymentScheduleService
        ){}
    
    async createPayrollComponentAllowance(user:any, payrollComponentAllowance:payrollComponentAllowanceDto){
        const i =instanceToPlain(payrollComponentAllowance)
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

        const result = await this.payrollComponentAllowanceModel.create(i)
        return result
    }

    async deleteOnePayrollComponentAllowance(user:any, id:any){
        await this.findOnePayrollComponentAllowance(user, id)
        const result = await this.payrollComponentAllowanceModel.deleteOne({_id:id})
        return result
    }

    async findOnePayrollComponentAllowance(user:any, id:any){
        const payrollComponentAllowance = await this.payrollComponentAllowanceModel.findById(id)
        if(!payrollComponentAllowance){
            throw new NotFoundException("no payroll component allowance found with the id: " +id)
        }

        let result = payrollComponentAllowance.toObject()
        result.createdAt = payrollComponentAllowance.createdAt.toLocaleString()

        return result
    }

    async findPayrollComponentAllowance(user:any){
        const payrollComponentAllowances = await this.payrollComponentAllowanceModel.find({company: user.company})
        if(payrollComponentAllowances.length == 0){
            throw new NotFoundException("no payroll component allowance found in this company" )
        }

        let result = payrollComponentAllowances.map((i)=>{
            return i.toObject()
        })
        result.map((i)=>{
            i.createdAt = i.createdAt.toLocaleString()
        })

        return result
    }

    async editPayrollComponentAllowance(user:any, payrollComponentAllowance: payrollComponentAllowanceDto, id:any){

        await this.findOnePayrollComponentAllowance(user,id)

        const i =instanceToPlain(payrollComponentAllowance)

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

        const result = await this.payrollComponentAllowanceModel.updateOne({_id:id},{$set: i})

        return result
    }

    async findArrPayrollComponentAllowance(user:any, array: any){
        for (let index = 0; index < array.length; index++) {
            await this.findOnePayrollComponentAllowance(user,array[index].allowance)
      
            let duplicate = array.filter(t => t.allowance === array[index].allowance)
            if(duplicate.length > 1){
                throw new ForbiddenException("found duplicate allowance id of " + array[index].allowance)
            }
          }
          return array
    }
}
