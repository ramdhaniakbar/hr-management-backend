import * as mongoose from "mongoose"
import { Company} from "src/company/model"
import { Attendance } from "src/time-management/attendance/attendance/attendance.model"
import { User } from "src/users/user.model"

export const PayslipSchema =  new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    payrollCutOff: {type: String},
    earning:{ type:[
        {
        name: {type: String},
        total: {type: Number},
    }]},
    totalEarning: {type: Number},
    deduction:{ type:[
        {
        name: {type: String},
        total: {type: Number},
    }]},
    additionalDeduction:{ type:[
        {
        name: {type: String},
        total: {type: Number},
    }]},
    totalDeduction: {type: Number},
    takeHomePay: {type: Number},
    benefit:{ type:[
        {
        name: {type: String},
        total: {type: Number},
    }]},
    attendanceSummary: {type:{
        actualWorkingDay:{type: Number},
        scheduleWorkingDay:{type: Number},
        dayOff:{type: Number},
        natinalHoliday:{type: Number},
        companyHoliday:{type: Number},
        attendance:{type: mongoose.Schema.Types.ObjectId, ref: "Attendance"},
    }},
    createdAt: {type: Date, default: Date.now}, 
})

export interface Payslip extends mongoose.Document{
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly payrollCutOff: string,
    readonly earning: [{
        readonly _id?:mongoose.Schema.Types.ObjectId ,
        readonly name: string,
        readonly total: number,
    }],
    readonly totalEarning: number,
    readonly deduction: [{
        readonly _id?:mongoose.Schema.Types.ObjectId ,
        readonly name: string,
        readonly total: number,
    }],
    readonly additionalDeduction: [{
        readonly _id?:mongoose.Schema.Types.ObjectId ,
        readonly name: string,
        readonly total: number,
    }],
    readonly totalDeduction: number,
    readonly takeHomePay: number,
    readonly benefit: [{
        readonly _id?:mongoose.Schema.Types.ObjectId ,
        readonly name: string,
        readonly total: number,
    }],
    readonly attendanceSummary: {
        readonly actualWorkingDay: number,
        readonly scheduleWorkingDay: number,
        readonly dayOff: number,
        readonly nationalHoliday: number,
        readonly companyHoliday: number,
        readonly attendance:  mongoose.Schema.Types.ObjectId| Attendance,
    },
    readonly createdAt: Date,
}