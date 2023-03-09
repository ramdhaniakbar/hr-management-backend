import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { TimeOffTypePolicy } from "../time-off-type-policy/time-off-type-policy.model"

//ketika ingin menemukan apakah user memiliki policy atau tidak terlihat dari timeOffBalance jika user tidak memiliki time off balance maka user tidak mendapatkan time off policy tsb
//jika user memiliki time off balance tetapi belum ada saldonya maka user masih bisa mendapatkan saldo jika sudah memenuhi first emerge dari time off policy 
export const TimeOffBalanceSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    policy: {type:mongoose.Schema.Types.ObjectId, ref: "TimeOffTypePolicy" },
    unlimitedBalance:{type:Boolean},

    // !!! kemungkinan time off balance langsung dihapus ketika dibuat expired
    expired: {type:Boolean, default:false},
    timeOffBalance: {type:
        [{  
            effectiveDate:{type:Date},
            expiredDate:{type:Date},
            noExpiryDate: {type:Boolean},
            //balance bisa negatif ketika negatif akan memiliki effdate dan no expirydatenya sendri yang mengikuti tipe time offnya
            emergeBalance: {type: Number},
        }]
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now}
})

export interface TimeOffBalance extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly unlimitedBalance: boolean,
    readonly policy: TimeOffTypePolicy| mongoose.Schema.Types.ObjectId,
    readonly timeOffBalance:
        [{  
            readonly _id?: mongoose.Schema.Types.ObjectId,
            readonly emergeBalance: number,
            readonly effectiveDate: Date,
            readonly expiredDate: Date,
            readonly noExpiryDate: boolean
        }]
    readonly createdAt: Date,
    readonly createdBy: mongoose.Schema.Types.ObjectId|User
    }