import * as mongoose from "mongoose"
import { Company} from "src/company/model"
import { User } from "src/users/user.model"

export const EmployeeResignationSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    employee:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    resignDate: {type: Date}, 
    lengthOfService: {type: String},
    meritPay: {type: Number},
    reason: {type: String},
    severance: {type: Number},
    compensationPay: {type: Number},
    timeOffCompensation: {type: Number},
    amountPerDay: {type: Number},
    totalAmount: {type: Number},
    notes: {type: String}, 
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface EmployeeResignation extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly employee: User | mongoose.Schema.Types.ObjectId,
    readonly resignDate: Date,
    readonly meritPay: number,
    readonly reasone: string,
    readonly severance: number,
    readonly compensationPay: number,
    readonly timeOffCompensation: number,
    readonly amountPerDay: number,
    readonly totalAmount: number,
    readonly notes: string,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}