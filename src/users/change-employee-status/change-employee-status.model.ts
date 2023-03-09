import * as mongoose from "mongoose"
import { Company, EmploymentStatus} from "src/company/model"
import { User } from "src/users/user.model"

export const ChangeEmployeeStatusSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    employee:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    effectiveDate: {type: Date}, 
    changedStatus:{ type: mongoose.Schema.Types.ObjectId, ref: "EmploymentStatus"},
    originalStatus:{ type: mongoose.Schema.Types.ObjectId, ref: "EmploymentStatus"},
    notes: {type: String},
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface ChangeEmployeeStatus extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly employee: User | mongoose.Schema.Types.ObjectId,
    readonly effectiveDate: Date,
    readonly changedStatus: EmploymentStatus | mongoose.Schema.Types.ObjectId,
    readonly originalStatus: EmploymentStatus | mongoose.Schema.Types.ObjectId,
    readonly notes: string,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}