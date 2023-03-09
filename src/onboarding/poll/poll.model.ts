import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"

export const PollSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    pollName: {type: String},
    pollOption: { type: [
        {   
            pollOption: {type: String},
            voters:{ type:[{user:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}}]},
            pollOptionIndex: {type: Number},
        }]
    },
    endDate: {type: Date},
    allowToCreateOther: {type: Boolean},
    participant:{ type:[{user:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}}]},
    allowToComment: {type: Boolean},
    comment: { type: [
        {   
            createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
            comment: {type: String},
            createdAt: {type: Date, default: Date.now},
        }]
    },
    sendNotification: {type: Boolean},
    status: {type: Boolean},
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface Poll extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly pollName: string,
    readonly pollOption: [{
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly pollOption: string,
        readonly voters?: [{user: User | mongoose.Schema.Types.ObjectId}]
        readonly pollOptionIndex: number,
    }],
    readonly endDate: Date,
    readonly allowToCreateOther: boolean,
    readonly participant: [{user: User | mongoose.Schema.Types.ObjectId}]
    readonly allowToComment: boolean,
    readonly comment: [{
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly createdAt?: Date,
        readonly comment: string,
        readonly createdBy: User | mongoose.Schema.Types.ObjectId,
    }],
    readonly sendNotification: boolean,
    readonly status: boolean,
    readonly updatedAt: Date,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}