import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { ShiftDetailType } from "../shift-detail-type/shift-detail-type.model"

export const ShiftPatternSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    patternName: {type: String},
    shift: {type:
        [{
            shift: {type: mongoose.Schema.Types.ObjectId, ref: "ShiftDetailType"},
        }]
    },
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface ShiftPattern extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly shiftName: string,
    readonly shift:[{
        _id?:mongoose.Schema.Types.ObjectId,
        shift: ShiftDetailType | mongoose.Schema.Types.ObjectId,
    }],
    readonly createdAt: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
}