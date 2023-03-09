import * as mongoose from "mongoose"
import { User } from "src/users/user.model"
import { Company } from "./company.model"
import { Grade } from "./grade.model"

export const ClassSchema = new mongoose.Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    className: {type: String, required: true},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: "Grade"},
    from: {type: Number},
    to: {type: Number},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    updatedAt: {type: Date, default: Date.now}
})
ClassSchema.index({company: 1, parent: 1,className: 1}, {unique: true})

export interface Class extends mongoose.Document{
    readonly company: Company,
    readonly className: string,
    readonly parent: Grade | mongoose.Schema.Types.ObjectId,
    readonly from: number,
    readonly to: number,
    readonly createdAt: Date,
    readonly createdBy: User,
    readonly updatedAt: Date,

}