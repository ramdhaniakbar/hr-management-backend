import * as mongoose from "mongoose"
import { Company, JobLevel, OrganizationChart } from "src/company/model"
import { User } from "src/users/user.model"
import { TaskForNewEmployee } from "../task-for-new-employee/task-for-new-employee.model"

export const OnboardingSettingSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    settingName: {type: String},
    jobLevel: {type:mongoose.Schema.Types.ObjectId, ref: "JobLevel"},
    workLocation: {type: String},
    instruction: {type: String},
    selectOnMap: {type: String},
    taskForInviter: {type: [{
        task:{type: mongoose.Schema.Types.ObjectId, ref: "TaskForNewEmployee"}
    }]},
    taskForNewEmployee: {type: [{
        task:{type: mongoose.Schema.Types.ObjectId, ref: "TaskForNewEmployee"}
    }]},
    organization: {type:mongoose.Schema.Types.ObjectId, ref: "Organization"},
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface OnboardingSetting extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly settingName: string,
    readonly jobLevel: JobLevel | mongoose.Schema.Types.ObjectId,
    readonly workLocation: string,
    readonly instruction: string,
    readonly selectOnMap: string,
    readonly taskForInviter: [{_id?: mongoose.Schema.Types.ObjectId,
        task: TaskForNewEmployee | mongoose.Schema.Types.ObjectId }],
    readonly taskForNewEmployee: [{_id?: mongoose.Schema.Types.ObjectId,task: TaskForNewEmployee | mongoose.Schema.Types.ObjectId }],
    readonly organization: OrganizationChart | mongoose.Schema.Types.ObjectId,
    readonly createdAt: Date
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}