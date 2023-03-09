import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { requestStatuses } from "src/enum"
import { User } from "src/users/user.model"
import { CashAdvanceCategory } from "../cash-advance-category/cash-advance-category.model"
import { CashAdvancePolicy } from "../cash-advance-policy/cash-advance-policy.model"

export const RequestCashAdvanceSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    employee: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
    requestDate: {type: Date},
    policy:{type:  mongoose.Schema.Types.ObjectId, ref: "CashAdvancePolicy"},
    purpose:{type:  String},
    amount: {type: Number},
    status: {type: String, enum: requestStatuses},
    dateOfUse: {type: Date},
    expenseRequest: {type:
        [{
            name:{type: String},
            description: {type: String},
            category: {type: mongoose.Schema.Types.ObjectId, ref: "CashAdvanceCategory"},
            amount: {type: Number}
        }]
    },
    notes: {type: String},
    attachment: {type: String},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface RequestCashAdvance extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly employee: User | mongoose.Schema.Types.ObjectId,
    readonly request: Date,
    readonly policy: CashAdvancePolicy | mongoose.Schema.Types.ObjectId,
    readonly purpose: string,
    readonly amount: number,
    readonly status: requestStatuses | string,
    readonly dateOfUse: Date,
    readonly expenseRequest:[{
        _id?:mongoose.Schema.Types.ObjectId,
        name: string,
        description: string,
        category: CashAdvanceCategory | mongoose.Schema.Types.ObjectId,
        amount: number
    }],
    readonly notes: string,
    readonly attachment: string,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}