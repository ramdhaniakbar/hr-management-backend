import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"

export const CashAdvanceCategorySchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company" },
    categoryName:{type: String, required: true},
    SetLimitAmountPerRequest: {type: Boolean},
    limitAmountPerRequest: {type: Number},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface CashAdvanceCategory extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly categoryName: string,
    readonly SetLimitAmountPerRequest: boolean,
    readonly limitAmountPerRequest: number,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}