import * as mongoose from "mongoose"
import { User } from "src/users/user.model"
import { Company } from "./company.model"

export const OrganizationChartSchema = new mongoose.Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    parent : {type: mongoose.Schema.Types.ObjectId, ref: "OrganizationChart"},
    orgName: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    updatedAt: {type: Date, default: Date.now}
})
OrganizationChartSchema.index({company: 1, orgName: 1}, {unique: true})

export interface OrganizationChart extends mongoose.Document{
    readonly company: Company,
    readonly parent: OrganizationChart | mongoose.Schema.Types.ObjectId,
    readonly orgName: string,
    readonly createdAt: Date,
    readonly createdBy: User,
    readonly updatedAt: Date,

}