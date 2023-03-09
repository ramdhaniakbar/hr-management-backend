import * as mongoose from "mongoose"

export const MasterNationalHolidaySchema =  new mongoose.Schema({
    holidayDate:{type: Date, required: true},
    holidayName:{type: String, required: true}
})

export interface MasterNationalHoliday extends mongoose.Document{
    readonly holidayDate: Date,
    readonly holidayName: string
}