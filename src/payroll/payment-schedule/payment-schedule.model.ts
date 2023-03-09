import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { dateFormatTypes, days, paymentScheduleTypes, payrollScheduleModelTypes } from "src/enum"
import { User } from "src/users/user.model"

export const PaymentScheduleSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    paymentScheduleName:{type:String},
    paymentScheduleType:{type:String, enum: paymentScheduleTypes},
    payrollDate:{type:Number},
    parentSchedule :{type: mongoose.Schema.Types.ObjectId, refPath: "model_type"},
    model_type:{type: String, enum:payrollScheduleModelTypes},
    taxCalculateWithSalary:{type:Boolean},
    attendance:{type:
        {
            from :{type: Number},
            to :{type: Number},
        }
    },
    payroll:{type:
        {
            from :{type: Number},
            to :{type: Number},
        }
    },
    attendancePayLastMonth:{type:Boolean},
    startDate:{type:Date},
    cutoffDay:{type:String, enum: days},
    createdAt:{type:Date, default: Date.now},
    createdBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface PaymentSchedule extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly paymentScheduleName: string,
    readonly paymentScheduleType:  string|paymentScheduleTypes,
    readonly payrollDate: number,
    readonly parentSchedule:  mongoose.Schema.Types.ObjectId|PaymentSchedule | string,
    readonly taxCalculateWithSalary: boolean,
    readonly attendance: {
        readonly from: number,
        readonly to: number,
    },
    readonly payroll: {
        readonly from: number,
        readonly to: number,
    },
    readonly attendancePayLastMonth: boolean,
    readonly startDate: Date,
    readonly cutoffDay:  string|days,
    readonly createdAt: Date,
    readonly createdBy:  mongoose.Schema.Types.ObjectId|User,
}