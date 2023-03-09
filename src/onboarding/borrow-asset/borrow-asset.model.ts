import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { Asset } from "../asset/asset.model"

export const BorrowAssetSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    holder:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    assetCategory: {type: mongoose.Schema.Types.ObjectId, ref: "Asset"},
    serialNumber: {type: String},
    description: {type: Number},
    lendDate: {type: Date},
    returnDate: {type: Date},
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface BorrowAsset extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly holder: User | mongoose.Schema.Types.ObjectId,
    readonly assetCategory: Asset|mongoose.Schema.Types.ObjectId,
    readonly serialNumber: string,
    readonly description: string,
    readonly lendDate: Date,
    readonly returnDate: Date,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}