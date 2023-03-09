import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { Task } from "../task/task.model"

export const ActivityLogSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    date: {type: Date},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    activity: {type: String},
})

export interface ActivityLog extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly date: Date,
    readonly user: User | mongoose.Schema.Types.ObjectId
    readonly activity: string,
}