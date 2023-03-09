import * as mongoose from "mongoose"
import { User } from "src/users/user.model"
import { Company } from "./company.model"

export const GradeSchema = new mongoose.Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    gradeName: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    updatedAt: {type: Date, default: Date.now}
})
GradeSchema.index({company: 1, gradeName: 1}, {unique: true})

export interface Grade extends mongoose.Document{
    readonly company: Company,
    readonly gradeName: string,
    readonly createdAt: Date,
    readonly createdBy: User,
    readonly updatedAt: Date,

}