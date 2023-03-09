import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { requestStatuses } from "src/enum"
import { User } from "src/users/user.model"
import { ReimbursementPolicy } from "../reimbursement-policy/reimbursement-policy.model"

export const RequestReimbursementSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    reimbursement:{type:mongoose.Schema.Types.ObjectId, ref: "ReimbursementPolicy" },
    effectiveDate: {type: Date},
    employee: {type:[{employee: {type: mongoose.Schema.Types.ObjectId, ref: "User"}}] },
    fileAttachment: {type: String},
    benefit: {type:
        [{
            benefit: {type: mongoose.Schema.Types.ObjectId, ref: "ReimbursementPolicy.benefit"},
            requestAmount: {type: Number},
            paidAmount: {type: Number},
            description: {type: String},
        }]
    },
    status: {type: String, enum: requestStatuses},
    notes: {type: String},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface RequestReimbursement extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly reimbursement:mongoose.Schema.Types.ObjectId |ReimbursementPolicy,
    readonly effectiveDate: Date,
    readonly employee: [{_id?:mongoose.Schema.Types.ObjectId, employee: User | mongoose.Schema.Types.ObjectId}],
    readonly fileAttachment: string,
    readonly benefit:[{
        _id?:mongoose.Schema.Types.ObjectId,
        benefit: mongoose.Schema.Types.Subdocument | mongoose.Schema.Types.ObjectId,
        requestAmount: number,
        paidAmount: number,
        description: string,
    }],
    readonly status: requestStatuses | string,
    readonly notes: string,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}