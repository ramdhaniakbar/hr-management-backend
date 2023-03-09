import * as mongoose from "mongoose"

export const MasterBankSchema =  new mongoose.Schema({
    bankName:{type: String, required: true},
    createdAt:{type: Date, default: Date.now},
})

export interface MasterBank extends mongoose.Document{
    readonly bankName: string,
    readonly createdAt: Date,

}