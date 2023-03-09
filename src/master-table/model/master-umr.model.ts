import * as mongoose from "mongoose"
import { MasterStateProvince } from "./master-state-province.model"

export const MasterUmrSchema =  new mongoose.Schema({
    city:{type: mongoose.Schema.Types.ObjectId,ref: "MasterStateProvince.city", required: true},
    umr:{type: Number, required: true}
})

export interface MasterUmr extends mongoose.Document{
    readonly city: MasterStateProvince| mongoose.Schema.Types.ObjectId, 
    readonly umr: number
}