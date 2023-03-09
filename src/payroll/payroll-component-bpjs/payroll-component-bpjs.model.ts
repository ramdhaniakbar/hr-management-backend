import * as mongoose from "mongoose"
import { Company} from "src/company/model"
import { salaryTypes, useSalaryTypes } from "src/enum"
import { User } from "src/users/user.model"
import { PaymentSchedule } from "../payment-schedule/payment-schedule.model"
import { PayrollComponentAllowance } from "../payroll-component-allowance/payroll-component-allowance.model"

export const PayrollComponentBpjsSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    bpjsName:{type:String},
    normalCalculation:{type:Boolean},
    formula:{type:String, default:"formula"},
    payrollComponentIncluded: {type:[
        {
            allowance:{type: mongoose.Schema.Types.ObjectId, ref: "payrollComponentAllowance"}
        }]
    },
    // payrollPaymentSchedule :{type: mongoose.Schema.Types.ObjectId, ref: "paymentSchedule"},
    includeBackpay:{type: Boolean},
    salaryType:{type:String, enum: salaryTypes},
    useSalaryType:{type:String, enum: useSalaryTypes},
    // customAmount:{type: Number},
    createdAt:{type:Date, default: Date.now},
    createdBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface PayrollComponentBpjs extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly bpjsName: string,
    readonly normalCalculation: boolean,
    readonly formula: string,
    readonly payrollComponentIncluded: [{_id?: mongoose.Schema.Types.ObjectId, allowance: mongoose.Schema.Types.ObjectId|PayrollComponentAllowance}]
    // readonly payrollPaymentSchedule:  mongoose.Schema.Types.ObjectId|PaymentSchedule,
    readonly includeBackPay: boolean,
    readonly salaryType: string|salaryTypes,
    readonly useSalaryType: string | useSalaryTypes,
    // readonly customAmount: number,
    readonly createdAt: Date,
    readonly createdBy:  mongoose.Schema.Types.ObjectId|User,
}