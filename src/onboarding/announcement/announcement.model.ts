import * as mongoose from "mongoose"
import { Company, OrganizationChart } from "src/company/model"
import { User } from "src/users/user.model"

export const AnnouncementSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    sendTo: { type: [
        {
            organization: {type: mongoose.Schema.Types.ObjectId, ref: "Organization"}
        }]
    },
    subject: {type: String},
    content: {type: String},
    attachment: {type: String},
    sendEmailNotification: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface Announcement extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly sendTo: [{
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly organization: OrganizationChart | mongoose.Schema.Types.ObjectId
    }],
    readonly subject: string,
    readonly content: string,
    readonly attachment: string,
    readonly sendEmailNotification: boolean,
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}