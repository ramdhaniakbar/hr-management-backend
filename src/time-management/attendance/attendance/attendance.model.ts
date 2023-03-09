import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { Schedule } from "src/time-management/schedule/schedule/schedule.model"
import { TimeOffTypePolicy } from "src/time-management/time-off/time-off-type-policy/time-off-type-policy.model"
import { User } from "src/users/user.model"

export const AttendanceSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    timeOff:{type: mongoose.Schema.Types.ObjectId, ref: "TimeOffTypePolicy"},
    attendanceDate: {type: Date},
    shift: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule"},
    checkIn: {type: Date},
    checkOut: {type: Date},
    breakIn: {type: Date},
    breakOut: {type: Date},
    breakNotes: {type: String},
    foto: {type: String},
    location: {type: String},
    overtime: {type: Boolean},
    overtimeDuration: {type: 
        {
            hour: {type: Number},
            minute: {type: Number}
        }
    },
    overtimeBefore: {type: 
        {
            hour: {type: Number},
            minute: {type: Number}
        }
    },
    overtimeAfter: {type: 
        {
            hour: {type: Number},
            minute: {type: Number}
        }
    },
    overtimeBeforeBreak: {type: 
        {
            hour: {type: Number},
            minute: {type: Number}
        }
    },
    overtimeAfterBreak: {type: 
        {
            hour: {type: Number},
            minute: {type: Number}
        }
    },
    overtimeBreakDuration: {type: 
        {
            hour: {type: Number},
            minute: {type: Number}
        }
    },
    attendanceCode:{type: String},
    updatedAt: {type: Date, default: Date.now},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export interface Attendance extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly timeOff: TimeOffTypePolicy | mongoose.Schema.Types.ObjectId,
    readonly attendanceDate: Date,
    readonly shift: Schedule | mongoose.Schema.Types.ObjectId,
    readonly checkIn: Date,
    readonly checkOut: Date,
    readonly breakIn: Date,
    readonly breakOut: Date,
    readonly breakNotes: string,
    readonly foto: string,
    readonly location: string,
    readonly overtime: boolean,
    readonly overtimeDuration: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly overtimeBefore: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly overtimeAfter: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly overtimeBeforeBreak: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly overtimeAfterBreak: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly overtimeBreakDuration: {
        readonly hour: number,
        readonly minute: number,
    },
    readonly attendanceCode: string,
    readonly updatedAt: Date,
    readonly updatedBy: User | mongoose.Schema.Types.ObjectId,
}