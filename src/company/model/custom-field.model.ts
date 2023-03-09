import * as mongoose from "mongoose"
import { User } from "src/users/user.model"
import { customFieldType } from "../enum"
import { Company } from "./company.model"

export const CustomFieldSchema = new mongoose.Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    fieldName: {type: String, required: true},
    fieldType: {type: String, required: true, enum: customFieldType},
    ees: {type: Boolean},
    cv: {type: Boolean},
    fieldOption: {type:[String]},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    updatedAt: {type: Date, default: Date.now}
})
CustomFieldSchema.index({company: 1, fieldName: 1}, {unique: true})

export interface CustomField extends mongoose.Document{
    readonly company: Company,
    readonly fieldName: string,
    readonly fieldType: string | customFieldType,
    readonly ees: boolean,
    readonly cv: boolean,
    readonly fieldOption: [string],
    readonly createdAt: Date,
    readonly createdBy: User,
    readonly updatedAt: Date,
}