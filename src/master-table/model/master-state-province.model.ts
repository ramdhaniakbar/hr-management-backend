import * as mongoose from "mongoose"

export const MasterStateProvinceSchema =  new mongoose.Schema({
    stateProvinceName:{type: String, required: true},
    city:{type:[{
        cityName:{type: String, required: true}
    }], required: true},

})

export interface MasterStateProvince extends mongoose.Document{
    readonly stateProvinceName: string,
    readonly city: [{_id?:mongoose.Schema.Types.ObjectId, cityName: string}],
}