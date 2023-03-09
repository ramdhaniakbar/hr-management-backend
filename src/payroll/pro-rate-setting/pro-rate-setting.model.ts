import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { prorateSettingTypes } from "src/enum"
import { User } from "src/users/user.model"

export const ProRateSettingSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company", unique: true},
    prorateSettingType:{type:String, enum: prorateSettingTypes},
    countNationalHoliday:{type:Boolean},
    customNumber:{type:Number},
    updatedAt:{type:Date, default: Date.now},
    updatedBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface ProRateSetting extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly prorateSettingType: string | prorateSettingTypes,
    readonly countNationalHoliday: boolean,
    readonly customNumber: number,
    readonly updatedAt: Date,
    readonly updatedBy:  mongoose.Schema.Types.ObjectId|User,
}