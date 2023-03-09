import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { updateTypes } from "src/enum"
import { User } from "src/users/user.model"
import { ReimbursementPolicy } from "../reimbursement-policy/reimbursement-policy.model"

export const AssignUpdateReimbursementSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    reimbursement:{type:mongoose.Schema.Types.ObjectId, ref: "ReimbursementPolicy" },
    type: {type: String, enum:updateTypes},
    description:{type:  String},
    effectiveDate: {type: Date},
    transactionDetail: {type:
        [{  
            user: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
            balance: {type: Number},
            startDate: {type: Date},
            endDate: {type: Date}
        }]
    },
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface AssignUpdateReimbursement extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly reimbursement:mongoose.Schema.Types.ObjectId |ReimbursementPolicy,
    readonly type: updateTypes|string,
    readonly description: string,
    readonly effectiveDate: Date,
    readonly transactionDetail:
        [{  
            readonly _id?: mongoose.Schema.Types.ObjectId,
            readonly user: User | mongoose.Schema.Types.ObjectId,
            readonly balance: number,
            readonly startDate: Date,
            readonly endDate: Date
        }],
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}