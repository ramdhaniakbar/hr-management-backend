import * as mongoose from "mongoose"
import { User } from "src/users/user.model"
import { Company } from "./company.model"

export const EmploymentStatusSchema = new mongoose.Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    statusName: {type: String, required: true},
    endDate: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    updatedAt: {type: Date, default: Date.now}
})
EmploymentStatusSchema.index({company: 1, statusName: 1}, {unique: true})

export interface EmploymentStatus extends mongoose.Document{
    readonly company: Company,
    readonly statusName: string,
    readonly endDate: boolean,
    readonly createdAt: Date,
    readonly createdBy: User,
    readonly updatedAt: Date,
}