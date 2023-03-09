import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { CashAdvanceCategory } from "../cash-advance-category/cash-advance-category.model"
import { RequestCashAdvance } from "../request-cash-advance/request-cash-advance.model"

export const CashAdvanceSettlementSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company" },
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
    requestCashAdvance:{type:mongoose.Schema.Types.ObjectId, ref: "RequestCashAdvance"},
    settlementName:{type: String},
    settlementDescription:{type: String},
    notes:{type: String},
    settlementAttachment:{type: String},
    settlementAmount:{type: Number},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface CashAdvanceSettlement extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly requestCashAdvance: RequestCashAdvance | mongoose.Schema.Types.ObjectId,
    readonly settlementName: string,
    readonly settlementDescription: string,
    readonly notes: string,
    readonly settlementAttachment: string,
    readonly settlementAmount: number,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}