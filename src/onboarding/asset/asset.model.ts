import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"

export const AssetSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    assetCategory: {type: String},
    description: {type: String},
    quantity: {type: Number},
    upload: {type: String},
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface Asset extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly assetCategory: string,
    readonly description: string,
    readonly quantity: number,
    readonly upload: string,
    readonly createdAt: Date
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}