import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { updateTypes } from "src/enum"
import { User } from "src/users/user.model"
import { PayrollComponentAllowance } from "../payroll-component-allowance/payroll-component-allowance.model"

export const TransactionUpdatePayrollSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    effectiveDate: {type: Date},
    componentName:{type:mongoose.Schema.Types.ObjectId, ref: "PayrollComponentAllowance" },
    type: {type: String, enum:updateTypes},
    description:{type:  String},
    backpay: {type: Boolean},
    backpayDate: {type: Date},
    employee: {type: 
        [{
            employeePayroll:{type:mongoose.Schema.Types.ObjectId, ref: "EmployeePayroll" },
            currentAmount: {type: Number},
            newAmount: {type: Number},
        }]
    },
    updatedAt: {type: Date, default: Date.now},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface TransactionUpdatePayroll extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly effectiveDate: Date,
    readonly componentName:mongoose.Schema.Types.ObjectId |PayrollComponentAllowance,
    readonly type: updateTypes|string,
    readonly description: string,
    readonly backpay: boolean,
    readonly backpayDate: Date,
    readonly employee:
        [{  
            readonly _id?: mongoose.Schema.Types.ObjectId,
            readonly employeePayroll: mongoose.Schema.Types.ObjectId,
            readonly currantAmount: number,
            readonly newAmount: number,
            
        }],
    readonly updatedAt: Date,
    readonly updatedBy: User | mongoose.Schema.Types.ObjectId,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}