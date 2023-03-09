import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { Task } from "../task/task.model"

export const TimeTrackerHistorySchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    taskDetail: {type: String},
    task: {type:mongoose.Schema.Types.ObjectId, ref: "Task"},
    startTime: {type: Date},
    endTime: {type: Date},
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface TimeTrackerHistory extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly user: User | mongoose.Schema.Types.ObjectId
    readonly taskDetail: string,
    readonly task: Task | mongoose.Schema.Types.ObjectId,
    readonly startTime: Date,
    readonly endTime: Date,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}