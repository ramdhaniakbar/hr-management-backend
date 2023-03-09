import * as mongoose from "mongoose"
import { customFieldType } from "./enum"

export const CompanySchema = new mongoose.Schema({
    email: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    companyName:{type:String },
    companyPhoneNumber:{type:String},
    companyAddress:{type:String},
    companyLogo:{type:String, default:"logo.jpg"},
    employeeQuota:{type: Number, default: 50},
    picEmail:{type: String},
    picPhoneNumber:{type: String},
    createdAt: {type: Date, default: Date.now},
    organizationChart: {type: [{
        parent: {type: mongoose.Schema.Types.ObjectId, ref: "Company.organizationChart"},
        orgName: {type: String, required: true, unique: true, sparse: true},
        createdAt: {type: Date,default: Date.now}
    }
    ]},
    jobLevel: {type:[{
        jobLevelName: {type: String, required: true,unique: true, sparse: true},
        level:{type: Number, default: 0},
        createdAt: {type: Date,default: Date.now}
    }]},
    employmentStatus: {type:[{
        statusName: {type: String, required: true, unique: true, sparse: true},
        endDate: {type: Boolean, required: true},
        createdAt: {type: Date,default: Date.now}
    }]},
    customField: {type: [{
        fieldName: {type: String, required: true, unique: true, sparse: true},
        fieldType: {type: String, required: true, enum: customFieldType},
        ees: {type: Boolean, required: true},
        cv: {type: Boolean, required: true},
        fieldOption: {type:[String]}
    }]}
}
)

export interface Company extends mongoose.Document{
    readonly email:string,
    readonly password:string,
    readonly companyName:string,
    readonly companyPhoneNumber:string,
    readonly companyAddress:string,
    readonly companyLogo:string,
    readonly employeeQuota:number,
    readonly picEmail: string,
    readonly picPhoneNumber: string,
    readonly createdAt: Date,
    readonly organizationChart: [{parent:string, orgName: string}],
    readonly jobLevel: [{jobLevelName:string}],
    readonly employmentStatus: [{statusName:string, endDate: boolean}],
    readonly customField: [{
        fieldName: string,
        fieldType: string,
        ees: boolean,
        cv:boolean,
        fieldOption: [String] 
    }]

 }