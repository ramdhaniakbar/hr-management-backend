import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { BreakType } from "../break-type/break-type.model"

export const ShiftDetailTypeSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    shiftName: {type: String},                
    in: {type: Date},
    out: {type: Date},
    // !!! break in dan breakout secara default dan untuk sekarang hanya bisa 12-13
    breakOut: {type: Date},
    breakIn: {type: Date},
    otBefore: {type: Date},
    otAfter: {type: Date},
    breakType: { type: mongoose.Schema.Types.ObjectId, ref: "BreakType"},
    hideInRequest: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},

})

export interface ShiftDetailType extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly shiftName: string,
    readonly in: Date,
    readonly out: Date,
    readonly breakOut: Date,
    readonly breakIn: Date,
    readonly otBefore: Date,
    readonly otAfter: Date,
    readonly breakType :mongoose.Schema.Types.ObjectId |BreakType,
    readonly hideInRequest: boolean,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}