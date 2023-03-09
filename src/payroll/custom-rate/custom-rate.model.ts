import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"

export const CustomRateSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    customRateName:{type:String},
    amount:{type:Number},
    effectiveDate:{type:Date},
    createdAt:{type:Date, default: Date.now},
    createdBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface CustomRate extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly customRateName: string,
    readonly amount: number,
    readonly effectiveDate: string,
    readonly createdAt: Date,
    readonly createdBy:  mongoose.Schema.Types.ObjectId|User,
}