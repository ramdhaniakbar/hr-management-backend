import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { overtimeTypes, requestStatuses, timeOffTypes } from "src/enum"
import { Attendance } from "src/time-management/attendance/attendance/attendance.model"
import { ShiftDetailType } from "src/time-management/schedule/shift-detail-type/shift-detail-type.model"
import { User } from "src/users/user.model"

export const RequestOvertimeSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    attendance: {type:mongoose.Schema.Types.ObjectId, ref: "Attendance" },
    status: {type: String, enum: requestStatuses},
    approvalLine:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now},
    overtimeDate: {type: Date},
    overtimeType: {type: String, enum: overtimeTypes},
    overtimeDurationWorkDay: {type:
        {
            duration:{type:
                {
                    hour:{type:Number},
                    minute:{type:Number}
                }
            },
            break: {type: Number},
        } 
    },
    breakDuration: {type: Number},
    shift:{type:  mongoose.Schema.Types.ObjectId, ref: "ShiftDetailType"},
    scheduleIn: {type: Date},
    scheduleOut: {type: Date},
    overtimeBeforeDuration:{type:
        {
            hour:{type:Number},
            minute:{type:Number}
        }
    },
    overtimeAfterDuration:{type:
        {
            hour:{type:Number},
            minute:{type:Number}
        }
    },
    breakAfterDuration:{type:
        {
            hour:{type:Number},
            minute:{type:Number}
        }
    },
    breakBeforeDuration:{type:
        {
            hour:{type:Number},
            minute:{type:Number}
        }
    },
    description: {type: String}
})

export interface RequestOvertime extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly sender: User | mongoose.Schema.Types.ObjectId,
    readonly attendance: Attendance | mongoose.Schema.Types.ObjectId,
    readonly status: requestStatuses|string,
    readonly approvalLine: User | mongoose.Schema.Types.ObjectId,
    readonly createdAt: Date,
    readonly overtimeDate: Date,
    readonly overtimeType: overtimeTypes|string,
    readonly overtimeDuration: {
        readonly duration: {
            readonly hour: number,
            readonly minute: number,
        },
        readonly break : number
    }
    readonly breakDuration: number,
    readonly shift: ShiftDetailType | mongoose.Schema.Types.ObjectId,
    readonly scheduleIn: Date,
    readonly scheduleOut: Date,
    readonly overtimeBeforeDuration: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly overtimeAfterDuration: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly breakAfterDuration: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly breakBeforeDuration: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly description: string,
}