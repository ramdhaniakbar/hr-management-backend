import * as mongoose from "mongoose"
import { Company, EmploymentStatus, JobLevel, OrganizationChart } from "src/company/model"
import { emergeTypes, interestTypes, taxGroups } from "src/enum"
import { User } from "src/users/user.model"

export const ReimbursementPolicySchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    reimbursementName:{type:mongoose.Schema.Types.ObjectId, ref: "LoanName" },
    effectiveDate: {type: Date},
    reimbursementDescription:{type: String},
    unlimitedAmount:{type: Boolean},
    defaultForNewEmployee:{type: Boolean},
    forAll:{type: Boolean},
    filterEmployee: {type:
        {
            organization:{type:[{organization: {type: mongoose.Schema.Types.ObjectId, ref: "OrganizationChart"}}]},
            jobLevel:{type:[{jobLevel: {type: mongoose.Schema.Types.ObjectId, ref: "JobLevel"}}]}
        }
    },
    includeInTakeHomePay:{type: Boolean},
    taxable:{type: Boolean},
    taxGroup: {type: String, enum: taxGroups},
    expiredInMonths: {type: Number},
    expiredDayMont:{type:
        {
            day:{type: Number},
            month:{type: Number},
            minimumExpiry:{type: Number},
        }},
    proRateOnFirstYear:{type: Boolean},
    noExpiryDate:{type: Boolean},
    maxRequestPerEmerge:{type: Number},
    emergeType:{type:String, enum: emergeTypes},
    annually: {
        type:{
            dayEmerge:{type: Number},
            monthEmerge:{type: Number},
            yearEmerge:{type: Number},
        }
    },
    emergeDay:{
        type:{
            anniversary:{type: Boolean},
            customDays: {type: Number}
    }},
    limitAmount: {type: Number},
    firstYearFlag:{type: Boolean},
    emergeAfter: {type: Number},
    firstEmergeStatus: {type:mongoose.Schema.Types.ObjectId, ref: "EmploymentStatus"},
    benefit: {type:
        [{
            benefitName:{type: String},
            maxRequest: {type: Number},
            minClaim: {type: Number}
        }]},
    hideInPayslip:{type: Boolean},
    hideInPayslipSuperAdmin:{type: Boolean},
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

export interface ReimbursementPolicy extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly reimbursementName: string,
    readonly effectiveDate: Date,
    readonly reimbursementDescription: string,
    readonly unlimitedAmount: boolean,
    readonly defaultForNewEmployee: boolean,
    readonly forAll: boolean,
    readonly filterEmployee: 
        {
            readonly organization:[{_id?: mongoose.Schema.Types.ObjectId,organization: mongoose.Schema.Types.ObjectId | OrganizationChart}],
            readonly jobLevel:[{_id?: mongoose.Schema.Types.ObjectId,jobLevel: mongoose.Schema.Types.ObjectId | JobLevel}]
        },
    readonly includeInTakeHomePay: boolean,
    readonly taxable: boolean,
    readonly taxGroup: taxGroups|string,
    readonly expiredInMonths: number,
    readonly expiredDayMont:{
            readonly day: number,
            readonly month: number,
            readonly minimumExpiry: number,
    },
    readonly proRateOnFirstYear: boolean,
    readonly noExpiryDate: boolean,
    readonly maxRequestPerEmerge: number,
    readonly emergeType: string,
    readonly annually: {
            readonly dayEmerge: number,
            readonly monthEmerge: number,
            readonly yearEmerge: number,
    },
    readonly emergeDay:{
            readonly anniversary: boolean,
            readonly customDays: number
    },
    readonly limitAmount: number,
    readonly firstYearFlag: boolean,
    readonly emergeAfter: number,
    readonly firstEmergeStatus:mongoose.Schema.Types.ObjectId| EmploymentStatus,
    readonly benefit:
        [{
            readonly _id?: mongoose.Schema.Types.ObjectId,
            readonly benefitName: string,
            readonly maxRequest: number,
            readonly minClaim: number,
        }],
    readonly hideInPayslip: boolean,
    readonly hideInPayslipSuperAdmin: boolean,
    readonly createdAt: Date,
    readonly createdBy: mongoose.Schema.Types.ObjectId|User
}