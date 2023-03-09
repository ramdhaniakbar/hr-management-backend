import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { CashAdvanceCategory } from "../cash-advance-category/cash-advance-category.model"

export const CashAdvancePolicySchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company" },
    policyName:{type: String, required: true},
    effectiveDate: {type: Date},
    settlementDueDate: {type: Date},
    includeAllCategory:{type: Boolean},
    categories: [{category:{type: mongoose.Schema.Types.ObjectId, ref:"CashAdvanceCategory"}}],
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface CashAdvancePolicy extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly policyName: string,
    readonly effectiveDate: Date,
    readonly settlementDueDate: Date,
    readonly includeAllCategory: boolean,
    readonly categories: [{_id?:mongoose.Schema.Types.ObjectId,category: CashAdvanceCategory | mongoose.Schema.Types.ObjectId}],
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}