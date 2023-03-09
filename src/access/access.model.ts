import * as mongoose from "mongoose"
import { Company, JobLevel, OrganizationChart } from "src/company/model"
import { MasterMenu } from "src/master-table/model"
import { User } from "src/users/user.model"
import { roleTypes } from "./enum"

//pada access role akan memiliki sebuah default employee untuk employee yang baru ditambahkan dan tidak mendapatkan role access dicompanynya

// !!! perlu revisi lagi setelah seluruh/mayoritas fitur telah di identifikasikan agar bisa memap seluruh menu controller yang ada
 export const AccessSchema = new mongoose.Schema(
    {
    company:{type:mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    roleName: {type: String, required: true},
    roleType: {type: String, required: true, enum:roleTypes, default:'employee'},
    filterEmployee:{ type:{
            superAdmin:{type:mongoose.Schema.Types.ObjectId, ref: "User" },
            organization:{type:[mongoose.Schema.Types.ObjectId], ref: "OrganizationChart"},
            jobLevel:{type: [mongoose.Schema.Types.ObjectId], ref: "JobLevel"},

            //employee/user dapat di assigned khusus sebuah role access
            assignedEmployee:{type:[mongoose.Schema.Types.ObjectId], ref: "User"}
        }
    },
    menuAccess: {type:[
        {
        menu:        {type:mongoose.Schema.Types.ObjectId, ref: 'MasterMenu'},
        view:        {type: Boolean, required: true},
        add:         {type: Boolean, required: true},
        edit:        {type: Boolean, required: true},
        delete:      {type: Boolean, required: true},
        request:     {type: Boolean, required: true},
        wholeCompany:{type: Boolean, required: true}
    }
    ]},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
AccessSchema.index({company: 1, roleName: 1 },{unique: true})


export interface Access extends mongoose.Document{
    readonly company: Company,
    readonly roleName: string,
    readonly roleType: string | roleTypes,
    readonly filterEmployee: {superAdmin: User | mongoose.Schema.Types.ObjectId, organization: OrganizationChart | mongoose.Schema.Types.ObjectId, jobLevel: JobLevel | mongoose.Schema.Types.ObjectId},
    readonly menuAccess: [{_id?:mongoose.Schema.Types.ObjectId, menu: MasterMenu | mongoose.Schema.Types.ObjectId, view: boolean, add: boolean, edit: boolean, delete: boolean, request: boolean, wholeCompany: boolean}],
    readonly createdAt: Date,
    readonly createdBy: User,
    readonly updaedAt: Date,
    readonly updatedBy: User,
}


