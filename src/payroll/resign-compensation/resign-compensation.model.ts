import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { pkwtTaxType } from "src/enum"
import { User } from "src/users/user.model"
import { PayrollComponentAllowance } from "../payroll-component-allowance/payroll-component-allowance.model"

export const ResignCompensationSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company", unique: true},
    // salary dihardcode jadi ketika mengkalkulasi akan otomatis ditambahkan
    components:{type:[ 
        {
            allowance:{type: mongoose.Schema.Types.ObjectId, ref: "PayrollComponentAllowance"},
        }]
    },
    //artikel pada menu resign compensation ada tax type PKWT Compensation
    taxType:{type: String, enum: pkwtTaxType},
    updatedAt:{type:Date, default: Date.now},
    updatedBy :{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


export interface ResignCompensation extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly components:[ 
    {
        readonly allowance:  mongoose.Schema.Types.ObjectId|PayrollComponentAllowance,
    }]
    readonly taxType: string,
    readonly updatedAt: Date,
    readonly updatedBy:  mongoose.Schema.Types.ObjectId|User,
}