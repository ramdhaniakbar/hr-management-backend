import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { getThrBasedOn, includeBpjs } from "src/enum"
import { User } from "src/users/user.model"
import { PayrollComponentAllowance } from "../payroll-component-allowance/payroll-component-allowance.model"

export const ThrSettingSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company", unique: true},
    thrType:{type:String, enum: getThrBasedOn},
    getThrAfterDays:{type:Number},
    getThrAfterMonths:{type:Number},
    numberOfDays:{type:Number},
    rounding:{type:Number},
    noRounding:{type:Boolean},
    includeBpjs:{type:String, enum: includeBpjs},
    thrComponent:{type: 
        [{
            allowance:{type:mongoose.Schema.Types.ObjectId, ref: "PayrollComponentAllowance"}
        }]
    },
    multiplierSettings:{type: 
        [{
            joinedYear:{type:Number},
            multiplyBy:{type:Number}
        }]
    },
    updatedAt:{type:Date, default: Date.now},
    updatedBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface ThrSetting extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly thrType: string| getThrBasedOn, 
    readonly getThrAfterDays: number,
    readonly getThrAfterMonths: number,
    readonly numberOfDays: number,
    readonly rounding: number,
    readonly noRounding: boolean,
    readonly includeBpjs: string,
    readonly thrComponent: [
        {
            readonly _id?:mongoose.Schema.Types.ObjectId,
            readonly allowance: mongoose.Schema.Types.ObjectId| PayrollComponentAllowance
        }
    ]
    readonly multiplierSettings: [
        {
            readonly _id?:mongoose.Schema.Types.ObjectId,
            readonly joinedYear: number,
            readonly multiplyBy: number,
        }
    ]
    readonly updatedAt: Date,
    readonly updatedBy:  mongoose.Schema.Types.ObjectId|User,
}