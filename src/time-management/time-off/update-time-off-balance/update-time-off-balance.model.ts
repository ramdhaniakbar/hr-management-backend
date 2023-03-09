import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { updateTypes } from "src/enum"
import { User } from "src/users/user.model"
import { TimeOffTypePolicy } from "../time-off-type-policy/time-off-type-policy.model"

export const UpdateTimeOffBalanceSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    timeOffPolicy:{type:mongoose.Schema.Types.ObjectId, ref: "TimeOffTypePolicy" },
    type: {type: String, enum:updateTypes},
    effectiveExpiredDate: {type: Date},
    description:{type:  String},
    timeOffTransactionDetail: {type:
        [{  
            user: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
            balance: {type: Number},
            startDate: {type: Date},
            endDate: {type: Date},   
        }]
    },
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface UpdateTimeOffBalance extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly timeOffPolicy:mongoose.Schema.Types.ObjectId |TimeOffTypePolicy,
    readonly type: updateTypes|string,
    readonly effectiveExpiredDate: Date,
    readonly description: string,
    readonly timeOffTransactionDetail:
        [{  
            readonly _id?: mongoose.Schema.Types.ObjectId,
            readonly user: User | mongoose.Schema.Types.ObjectId,
            readonly balance: number,
            readonly startDate: Date,
            readonly endDate: Date,
            
        }],
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}