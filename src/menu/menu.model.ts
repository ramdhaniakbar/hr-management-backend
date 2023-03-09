import * as mongoose from "mongoose"

export const MenuSchema = new mongoose.Schema({
    menuName: {type: String, required: true},
    controller: {type: String},
})

export interface Menu extends mongoose.Document{
    readonly menuName : string,
    readonly controller: string
}