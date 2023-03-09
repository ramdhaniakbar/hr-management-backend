import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { requestStatuses, timeOffTypes } from "src/enum"
import { User } from "src/users/user.model"
import { Attendance } from "../attendance/attendance.model"

export const RequestAttendanceSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    sender: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
    attendance:{type:  mongoose.Schema.Types.ObjectId, ref: "Attendance"},
    clockIn: {type: Date},
    clockOut: {type: Date},
    status: {type: String, enum: requestStatuses},
    description: {type: String},
    createdAt: {type: Date, default: Date.now}
})

export interface RequestAttendance extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly sender: User | mongoose.Schema.Types.ObjectId,
    readonly attendance: Attendance| mongoose.Schema.Types.ObjectId,
    readonly status: requestStatuses|string,
    readonly clockIn: Date,
    readonly clockOut: Date,
    readonly description: string,
    readonly createdAt: Date,
}