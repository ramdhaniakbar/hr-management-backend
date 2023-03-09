import * as mongoose from "mongoose"
import { Company, JobLevel, OrganizationChart } from "src/company/model"
import { amountTypes, payrollScheduleTypes, taxable } from "src/enum"
import { User } from "src/users/user.model"
import { CurrencyRate } from "../currency-rate/currency-rate.model"
import { PaymentSchedule } from "../payment-schedule/payment-schedule.model"

export const PayrollComponentDeductionSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    formula:{type:String, default:"formula"},
    deductionName:{type:String},
    amount:{type:Number},
    currency :{type: mongoose.Schema.Types.ObjectId, ref: "CurrencyRate"},
    payrollPaymentSchedule :{type: mongoose.Schema.Types.ObjectId, ref: "paymentSchedule"},
    type:{type:String, enum: payrollScheduleTypes},
    tax:{type:String, enum: taxable},
    default:{type: Boolean},
    bonus:{type: Boolean},
    proRate:{type: Boolean},
    allNewEmployee:{type: Boolean},
    filter: {type:
        {
            organization:{type:[{organization: {type: mongoose.Schema.Types.ObjectId, ref: "OrganizationChart"}}]},
            jobLevel:{type:[{jobLevel: {type: mongoose.Schema.Types.ObjectId, ref: "JobLevel"}}]}
        }
    },
    maximumAmount: {type:
        {
            maximumAmountType:{type:String, enum: amountTypes},
            maxAmount:{type:Number},
        }
    },
    createdAt:{type:Date, default: Date.now},
    createdBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface PayrollComponentDeduction extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly deductionName: string,
    readonly amount: number,
    readonly formula: string,
    readonly currency:  mongoose.Schema.Types.ObjectId|CurrencyRate,
    readonly payrollPaymentSchedule:  mongoose.Schema.Types.ObjectId|PaymentSchedule,
    readonly type: string|payrollScheduleTypes,
    readonly tax: string|taxable,
    readonly dafault: boolean,
    readonly bonus: boolean,
    readonly proRate: boolean,
    readonly allNewEmployee: boolean,
    readonly filter: 
    {
        readonly organization:[{_id?: mongoose.Schema.Types.ObjectId,organization: mongoose.Schema.Types.ObjectId | OrganizationChart}],
        readonly jobLevel:[{_id?: mongoose.Schema.Types.ObjectId,jobLevel: mongoose.Schema.Types.ObjectId | JobLevel}]
    },
    readonly maximumAmount: 
    {
        readonly maximumAmountType: string|amountTypes,
        readonly maxAmount: number,
    },
    readonly createdAt: Date,
    readonly createdBy:  mongoose.Schema.Types.ObjectId|User,
}