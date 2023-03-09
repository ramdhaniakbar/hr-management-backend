import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"

export const PayrollScheduleSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company", unique: true},
    payrollSchedule:{type:Number, default: 1},
    updatedAt:{type:Date, default: Date.now},
    updatedBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface PayrollSchedule extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly payrollSchedule: number,
    readonly updatedAt: Date,
    readonly updatedBy:  mongoose.Schema.Types.ObjectId|User,
}