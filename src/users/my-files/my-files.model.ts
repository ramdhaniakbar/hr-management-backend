import * as mongoose from "mongoose"
import { Company} from "src/company/model"
import { User } from "src/users/user.model"

export const MyFileSchemas =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    fileDescription: {type: String}, 
    publishDate: {type: Date}, 
    shareTo:{ type:[{user:{type: mongoose.Schema.Types.ObjectId, ref: "User"}}]},
    createdAt: {type: Date, default: Date.now}, 
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
})

export interface MyFiles extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly fileDescription: string,
    readonly publishDate: Date,
    readonly shareTo: [{_id?:mongoose.Schema.Types.ObjectId ,user: User | mongoose.Schema.Types.ObjectId}],
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}