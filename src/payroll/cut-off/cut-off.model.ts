import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { jhtSettingTypes, taxable, taxMethod } from "src/enum"
import { User } from "src/users/user.model"

export const CutOffSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company", unique: true},
    default:{type:Boolean},
    employeeTaxSetting:{type:String, enum: taxMethod},
    employeeSalaryTaxSettings:{type:String, enum: taxable},
    jhtSetting:{type:String, enum: jhtSettingTypes},
    bpjsKesehatanSetting:{type:String, enum: jhtSettingTypes},
    jaminanPensiunSetting:{type:String, enum: jhtSettingTypes},
    attendance:{type: 
        {
            from:{type:Number},
            to:{type:Number}
        }
    },
    payroll:{type: 
        {
            from:{type:Number},
            to:{type:Number}
        }
    },
    attendancePayLastMonth:{type:Boolean},
    updatedAt:{type:Date, default: Date.now},
    updatedBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface CutOff extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly default: boolean,
    readonly employeeTaxSetting: string| taxMethod,
    readonly employeeSalaryTaxSetting: string| taxable,
    readonly jhtSetting: string| jhtSettingTypes,
    readonly bpjsKesehatanSetting: string| jhtSettingTypes,
    readonly jaminanPensiunSetting: string| jhtSettingTypes, 
    readonly attendance: 
        {
            readonly from: number,
            readonly to: number,
        },
    readonly payroll: 
    {
        readonly from: number,
        readonly to: number,
    },
    readonly attendancePayLastMonth: boolean,
    readonly updatedAt: Date,
    readonly updatedBy:  mongoose.Schema.Types.ObjectId|User,
}