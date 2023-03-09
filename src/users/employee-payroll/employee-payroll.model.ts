import * as mongoose from "mongoose"
import { Company, NppBpjsKetenagakerjaan } from "src/company/model"
import {  employeeTaxStatus, paid, payrollScheduleModelTypes, payrollScheduleTypes, prorateSettingTypes, ptkpStatus, taxable, taxMethod } from "src/enum"
import { MasterBank } from "src/master-table/model"
import { PaymentSchedule } from "src/payroll/payment-schedule/payment-schedule.model"
import { PayrollComponentAllowance } from "src/payroll/payroll-component-allowance/payroll-component-allowance.model"
import { PayrollSchedule } from "src/payroll/payroll-schedule/payroll-schedule.model"
import { TransactionUpdatePayroll } from "src/payroll/transaction-update-payroll/transaction-update-payroll.model"
import { MasterOvertime } from "src/time-management/overtime/master-overtime/master-overtime.model"
import { User } from "src/users/user.model"

export const EmployeePayrollSchema =  new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User", unique:true},
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    salary: {type: Number},
    salaryType: {type: String, enum: payrollScheduleTypes},
    
    //bisa menggunakan antara payment dan payroll schedule
    paymentSchedule: {type:mongoose.Schema.Types.ObjectId, refPath: 'model_type'},
    model_type: { type: String, enum: payrollScheduleModelTypes },

    //prorate setting can be an enum or default prorate setting that is based on the company prorate setting default
    prorateSettingDefault: {type: mongoose.Schema.Types.ObjectId, ref:"ProRateSetting"},
    prorateSetting: {type:{
        prorateSetting:{type:String, enum: prorateSettingTypes},
        countNationalHoliday: {type: Boolean},
        customNumber: {type: Number},
    }},


    allowForOvertime: {type: Boolean},
    // overtime mengikuti overtime default jika tidak termasuk kedalam filter custom overtime default, kemudian data overtime di sini akan ditampilkan pada master overtime employee
    overtimeWorkingDefault: {type:mongoose.Schema.Types.ObjectId, ref: "MasterOvertime"},
    overtimeDayOffDefault: {type:mongoose.Schema.Types.ObjectId, ref: "MasterOvertime"},
    overtimeNationalHolidayDefault: {type:mongoose.Schema.Types.ObjectId, ref: "MasterOvertime"},

    bankName: {type:mongoose.Schema.Types.ObjectId, ref: "MasterBank"},
    accountNumber: {type: Number},
    accountHolder: {type: String},

    //bila npwp null employee dikenakan pajak penghasilan sebesar 20% lebih tinggi
    npwp: {type: String},
    ptkpStatus: {type: String, enum: ptkpStatus},
    taxMethod: {type: String, enum: taxMethod},
    taxSalary: {type: String, enum: taxable},

    //bila taxable date null maka mengacu pada joinedDate
    taxableDate: {type: Date},
    employeeTaxStatus: {type: String, enum: employeeTaxStatus},
    beginningNetto: {type: Number},
    pph21Paid: {type: Number},

    nppBpjsKetenagakerjaan:{ type:
        {
        currentNpp: {type:mongoose.Schema.Types.ObjectId, ref: "NppBpjsKetenagakerjaan"},
        effectiveDate: {type: Date},
        newNpp: {type:mongoose.Schema.Types.ObjectId, ref: "NppBpjsKetenagakerjaan"},
    }},

    // bila bpjsKetenagakerjaanDate null mengacu pada joinedDate
    bpjsKetenagakerjaanDate: {type: Date},
    bpjsKesehatanNumber: {type: String},
    bpjsKesehatanFamily: {type: Number},

    // bila bpjsKesehatanDate null mengacu pada joinedDate
    bpjsKesehatanDate: {type: Date},
    bpjsKesehatanCost: {type: String, enum: paid},
    jhtCost: {type: String, enum: paid},
    jaminanPensiunCost: {type: String, enum: paid},
    jaminanPensiunDate: {type: Date},
    payrollComponent:{ type:
        [{
        payrollComponent: {type:mongoose.Schema.Types.ObjectId, ref: "PayrollComponentAllowance"},
        componentAmount: {type: Number },
        expired: {type:mongoose.Schema.Types.ObjectId, ref: "TransactionUpdatePayroll"},
    }]},
    createdAt: {type: Date, default: Date.now}, 
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    updatedAt: {type: Date, default: Date.now}, 
    updatedBy: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
})

export interface EmployeePayroll extends mongoose.Document{
    readonly user: User | mongoose.Schema.Types.ObjectId,
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly salary: number,
    readonly salaryType: string|payrollScheduleTypes,
    readonly paymentSchedule: PaymentSchedule|PayrollSchedule | mongoose.Schema.Types.ObjectId|string,
    readonly prorateSetting:{ 
        readonly countNationalHoliday: boolean,
        readonly customNumber: number,
        readonly prorateSetting: string|prorateSettingTypes,
    }

    readonly allowForOvertime: boolean,
    readonly overtimeWorkingDefault: MasterOvertime | mongoose.Schema.Types.ObjectId,
    readonly overtimeDayOffDefault: MasterOvertime | mongoose.Schema.Types.ObjectId,
    readonly overtimeNationalHolidayDefault: MasterOvertime | mongoose.Schema.Types.ObjectId,
    readonly bankName:  MasterBank | mongoose.Schema.Types.ObjectId,
    readonly accountNumber: number,
    readonly accountHolder: string,
    readonly npwp: string,
    readonly ptkpStatus: string|ptkpStatus,
    readonly taxMethod: string|taxMethod,
    readonly taxSalary: string|taxable,
    readonly taxableDate: Date,
    readonly employeeTaxStatus: string|employeeTaxStatus,
    readonly beginningNetto: number,
    readonly pph21Paid: number,
    readonly nppBpjsKetenagakerjaan: {
        readonly oldNpp:  NppBpjsKetenagakerjaan| mongoose.Schema.Types.ObjectId,
        readonly effectiveDate: Date,
        readonly newNpp:  NppBpjsKetenagakerjaan| mongoose.Schema.Types.ObjectId,
    },
    readonly bpjsKetenagakerjaanDate: Date,
    readonly bpjsKesehatanNumber: string,
    readonly bpjsKesehatanFamily: number,
    readonly bpjsKesehatanDate: Date,
    readonly bpjsKesehatanCost: string| paid,
    readonly jhtCost: string| paid,
    readonly jaminanPensiunCost: string| paid,
    readonly jaminanPensiunDate: Date,
    readonly payrollComponent: [{
        readonly _id?:mongoose.Schema.Types.ObjectId ,
        readonly payrollComponent:  PayrollComponentAllowance| mongoose.Schema.Types.ObjectId,
        readonly componentAmount: number,
        readonly expired:  TransactionUpdatePayroll| mongoose.Schema.Types.ObjectId,
    }],
    readonly createdBy: User | mongoose.Schema.Types.ObjectId,
    readonly createdAt: Date,
    readonly updatedBy: User | mongoose.Schema.Types.ObjectId,
    readonly updatedAt: Date,
}