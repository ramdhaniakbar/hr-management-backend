import * as mongoose from "mongoose"
import { Company} from "src/company/model"
import { mailTypes } from "src/enum"
import { RequestCashAdvance } from "src/finance/cash-advance/request-cash-advance/request-cash-advance.model"
import { RequestReimbursement } from "src/finance/reimbursement/request-reimbursement/request-reimbursement.model"
import { Announcement } from "src/onboarding/announcement/announcement.model"
import { RequestAttendance } from "src/time-management/attendance/request-attendance/request-attendance.model"
import { RequestChangeShift } from "src/time-management/attendance/request-change-shift/request.change.shift.model"
import { RequestOvertime } from "src/time-management/overtime/request-overtime/request-overtime.model"
import { RequestTimeOff } from "src/time-management/time-off/request-time-off/request-time-off.model"
import { User } from "src/users/user.model"

export const InboxSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    mail: {type: mongoose.Schema.Types.ObjectId, refPath:"mailType"},
    mailType: {type: String, enum:mailTypes},
    read: {type: Boolean}, 
})

export interface Inbox extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly mail: RequestOvertime | RequestTimeOff | RequestAttendance 
    | RequestChangeShift | RequestReimbursement | RequestCashAdvance | 
    Announcement |mongoose.Schema.Types.ObjectId,
    readonly mailType: string | mailTypes
    readonly read: boolean,
}