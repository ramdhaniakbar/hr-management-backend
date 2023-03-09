import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"

export const CurrencyRateSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    currencyRateName:{type:String},
    amount:{type:Number},
    effectiveDate:{type:Date},
    createdAt:{type:Date, default: Date.now},
    createdBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface CurrencyRate extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly currencyRateName: string,
    readonly amount: number,
    readonly effectiveDate: Date,
    readonly createdAt: Date,
    readonly createdBy:  mongoose.Schema.Types.ObjectId|User,
}