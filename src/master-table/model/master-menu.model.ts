import * as mongoose from "mongoose"

export const MasterMenuSchema =  new mongoose.Schema({
    menuName:{type: String, required: true},
    controller:{type: String, required: true},
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, defaul: Date.now}
})

export interface MasterMenu extends mongoose.Document{
    readonly menuName: string,
    readonly controller: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
}