import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { progressTask } from "src/enum"
import { User } from "src/users/user.model"
import { Project } from "../project/project.model"

export const TaskSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    project: {type:mongoose.Schema.Types.ObjectId, ref: "Project"},
    taskName: {type: String},
    assignee: { type: [
        {
            user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
        }]
    },
    duplicate: {type: Boolean},
    dueOn: {type: Date},
    description: {type: String},
    attachment: {type: String},
    status: {type: String, enum: progressTask},
    comment:{ type: [
        {
            comment: {type: String},
            createdAt: {type: Date, default: Date.now},
            createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
        }]
    },
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface Task extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly project: Project | mongoose.Schema.Types.ObjectId,
    readonly taskName: string,
    readonly assignee: [{
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly user: User | mongoose.Schema.Types.ObjectId
    }],
    readonly duplicate: boolean,
    readonly dueOn: Date,
    readonly description: string,
    readonly attachment: string,
    readonly status: string| progressTask,
    readonly comment: [{
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly comment: string,
        readonly createdAt: Date,
        readonly createdBy: User | mongoose.Schema.Types.ObjectId,
    }],
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}