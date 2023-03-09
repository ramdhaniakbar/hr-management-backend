import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { ShiftDetailType } from "../shift-detail-type/shift-detail-type.model"
import { ShiftPattern } from "../shift-pattern/shift-pattern.model"

export const ScheduleSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    scheduleName:{type: String},
    pattern:{type:mongoose.Schema.Types.ObjectId, ref: "ShiftPattern"},
    effectiveDate: {type: Date},
    initialShift:{type:mongoose.Schema.Types.ObjectId, ref: "ShiftDetailType"},
    overrideNationalHoliday: {type: Boolean},
    overrideCompanyHoliday: {type: Boolean},
    flexible: {type: Boolean},
    includeLateInLateOut: {type: Boolean},
    setDefaultSchedule: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})
ScheduleSchema.index({company: 1, scheduleName: 1 },{unique: true})

export interface Schedule extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly scheduleName: string,
    readonly pattern:mongoose.Schema.Types.ObjectId | ShiftPattern,
    readonly effectiveDate: Date,
    readonly initialShift:mongoose.Schema.Types.ObjectId | ShiftDetailType,
    readonly overrideNationalHoliday: boolean,
    readonly overrideCompanyHoliday: boolean,
    readonly flexible: boolean,
    readonly includeLateInLateOut: boolean,
    readonly setDefaultSchedule: boolean,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}