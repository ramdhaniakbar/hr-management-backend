import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { requestStatuses } from "src/enum"
import { Schedule } from "src/time-management/schedule/schedule/schedule.model"
import { User } from "src/users/user.model"

export const RequestChangeShiftSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    sender: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
    effectiveDate: {type: Date},
    currentShift:{type:  mongoose.Schema.Types.ObjectId, ref: "Schedule"},
    newShift: {type:{
        in:{type:Date},
        out:{type: Date}
    }},
    status: {type: String, enum: requestStatuses},
    createdAt: {type: Date, default: Date.now}
})

export interface RequestChangeShift extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly sender: User | mongoose.Schema.Types.ObjectId,
    readonly effectiveDate: Date,
    readonly currentShift: Schedule| mongoose.Schema.Types.ObjectId,
    readonly newShift: {
        readonly in: Date,
        readonly out: Date,
    },
    readonly status: requestStatuses|string,
    readonly createdAt: Date,
}