import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { interestTypes } from "src/enum"
import { User } from "src/users/user.model"

export const LoanSchema =  new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User" },
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    loanName:{type:mongoose.Schema.Types.ObjectId, ref: "LoanName" },
    loanAmount: {type: Number},
    installment: {type: Number},
    interestType: {type: String, enum:interestTypes},
    interest: {type: Number},
    description:{type:  String},
    effectiveDate: {type: Date},
    payment: {type:
        [{
            installment: {type: Number},
            paymentDate: {type: Date},
            paymentAmount: {type: Number},
            interest: {type: Number},
            remainingLoan: {type: Number},
        }]
    },
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface Loan extends mongoose.Document{
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly loanName: string,
    readonly loanAmount: number,
    readonly installment: number,
    readonly interestType: interestTypes |string,
    readonly interest: number,
    readonly description: string,
    readonly effectiveDate: Date,
    readonly payment:[{
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly installment: number,
        readonly paymentDate: Date,
        readonly paymentAmount: number,
        readonly interest: number,
        readonly remainingLoan: number,
    }],
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}