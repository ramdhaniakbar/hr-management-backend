import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"

export const ProjectSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    projectName: {type: String},
    projectMember:{ type: [
        {
            user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
        }]
    },
    completed: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface Project extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly projectName: string,
    readonly projectMember: [{ readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly user: User | mongoose.Schema.Types.ObjectId}],
    readonly completed: boolean,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}