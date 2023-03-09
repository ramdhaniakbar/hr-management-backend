import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { absenceTypes, prorateSettingTypes } from "src/enum"
import { User } from "src/users/user.model"

export const AbsenceSettingSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company", unique: true},
    absenceAmountType:{type:String, enum: absenceTypes},
    customNumber:{type:Number},
    updatedAt:{type:Date, default: Date.now},
    updatedtedBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface AbsenceSetting extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly absenceAmountType: string | absenceTypes,
    readonly customNumber: number,
    readonly updatedAt: Date,
    readonly updatedBy:  mongoose.Schema.Types.ObjectId|User,
}