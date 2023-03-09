import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { requestStatuses, timeOffTypes } from "src/enum"
import { halfDayTypes } from "src/enum/half-day-types.enum"
import { User } from "src/users/user.model"
import { TimeOffTypePolicy } from "../time-off-type-policy/time-off-type-policy.model"

export const RequestTimeOffSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
    sendTo: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
    timeOffTypePolicy:{type:  mongoose.Schema.Types.ObjectId, ref: "TimeOffTypePolicy"},

    //half day hanya bisa dipilih jika allow half day di time off policy setting itu true
    timeOfftype: {type: String, enum: timeOffTypes},

    
    halfDayType: {type: String, enum: Object.values(halfDayTypes).concat([null])},

    //hanya akan ada jika memilih half day type schedule/ hanya ada after dan before break

    // scheduledIn: {type:Date},
    // scheduledOut:{type:Date},

    startDate: {type: Date},
    endDate: {type: Date},
    notes: {type: String},
    //ketika delegateTo dicentang berarti akan melakukan sekaligus request delegation ketika melakukan request time off
    delegate: {type: Boolean},
    delegateTo: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
    attachment: {type: String},
    comment: {type: String},

    // ketika request tidak di accept atau reject dalam jangka waktu start dan end date maka request secara default akan otomatis di cancel atau
    // bisa jika sudah melewati/sama dengan start date maka akan ke cancel
    // untuk statusnya kemungkinan bisa dibuat status baru berupa expired untuk mengandalinya 
    status: {type: String, enum: requestStatuses},
    taken: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface RequestTimeOff extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly policy: TimeOffTypePolicy | mongoose.Schema.Types.ObjectId,
    readonly timeOffType: timeOffTypes|string,
    readonly startDate: Date,
    readonly endDate: Date,
    // readonly scheduledIn: Date,
    // readonly scheduledOut: Date,
    readonly notes: string,
    readonly delegate: boolean,
    readonly delegateTo: User | mongoose.Schema.Types.ObjectId,
    readonly attachment: string,
    readonly comment: string,
    readonly amount: number,
    readonly status: requestStatuses|string,
    readonly taken: boolean,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}