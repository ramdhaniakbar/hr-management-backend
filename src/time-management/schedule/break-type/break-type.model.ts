import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"

export const BreakTypeSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    breakName: {type: String},
    breakTime :{type:[{
        breakOut: {type: Date},
        breakIn: {type: Date},
    }]},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface BreakType extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly breakTime: [{
        readonly breakOut: Date,
        readonly breakIn: Date
    }]
    readonly breakName: string,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}