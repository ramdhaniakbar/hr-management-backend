import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { ReimbursementPolicy } from "../reimbursement-policy/reimbursement-policy.model"

export const ReimbursementBalanceSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    reimbursementBalance: {type:
        [{  
            balance: {type: Number},
            policy: {type:mongoose.Schema.Types.ObjectId, ref: "ReimbursementPolicy" },
        }]
    },
})

export interface ReimbursementBalance extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly timeOffTransaction:
        [{  
            readonly _id?: mongoose.Schema.Types.ObjectId,
            readonly balance: number,
            readonly policy: ReimbursementPolicy | mongoose.Schema.Types.ObjectId,
        }],
}