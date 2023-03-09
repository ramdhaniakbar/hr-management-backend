import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import { User } from "src/users/user.model"
import { TimeOffTypePolicy } from "../time-off-type-policy/time-off-type-policy.model"

// !!! pada time off policy ada memiliki default time off policy yang berlaku untuk seluruh perusahaan
// time off policy defaultnya bisa disetting oleh masing masing perusahaan kembali di bagian time off setting
// jika menggunakan time off policy default maka pada saat dibuat company akan secara otomatis membuat time off policy defaultnya untuk perusahaan masing masing
const TimeOffTypePolicySettingSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    timeOffPolicy: {type:mongoose.Schema.Types.ObjectId, ref: "TimeOffTypePolicy"},

    //duration hanya dimiliki oleh time off default yang ada untuk setiap perusahaan
    duration:{type: Number, default: null},

    //Jika dicentang, maka cuti pada hari libur (dayoff) akan tetap memotong cuti karyawan(termasuk untuk hari minggu).
    includeDayOff:{type: Boolean, default: false},
    
    //Jika dicentang, maka cuti bisa direquest untuk setengah hari (before break / after break).
    allowHalfDay:{type: Boolean, default: false},

    //Jika dicentang, apabila request cuti setengah hari akan ada pilihan untuk mengisi schedule in atau schedule out.
    // setScheduleHalfDay:{type: Boolean, default:false},

    //Jika dicentang, maka akan otomatis terassign kepada karyawan yang baru diinput secara default akan diberi kepada semua employee yg baru join dan menggantikan default pada time off policy sehingga default time off policy tidak tergunakan
    // jika tidak dicentang maka mengikuti setting dari time off type policy
    setDefault: {type: Boolean, default: false},

    // !!! emergeAtJoin untuk sementara tidak di implementasikan dikarenakan tidak tau fungsinya dan kalau ada konflik dengan setting time off apa yang akan terjadi
    //Jika dicentang,  maka karyawan yang baru diinput secara otomatis balance cutinya akan muncul
    emergeAtJoin:{type: Boolean, default:false},

    //Jika dicentang, maka cuti tersebut akan muncul dipilihan request Time Off.
    show:{type: Boolean, default: true},

    // Jumlah maksimal hari yang diambil saat sekali request
    maxRequest:{type : Number, default: 0},
    allowMinus:{type: Boolean, default: false},

    // Jumlah hutang cuti yang bisa digunakan karyawan
    minusAmount: {type: Number, default: null},

    //Jika dicentang, maka sisa cuti yang sudah expired bisa diperpanjang
    // Contoh : Karyawan memiliki sisa 3 cuti tahunan yang akan expired pada bulan Desember dan “Carry Forward” diceklist maka sisa cuti tersebut bisa diperpanjang.
    carryForward:{type: Boolean, default:false},

    //Jumlah sisa cuti yang bisa diperpanjang.
    carryAmount: {type: Number, default: null},

    //masa berlaku dari saldo cuti yang diperpanjang
    carryExpired: {type: Number, default: null},

    //Jika dicentang, maka sisa cuti bisa diuangkan pada saat karyawan resign
    timeOffCompensation:{type: Boolean, default:false},
    attachmentMandatory:{type: Boolean, default:false},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    updatedAt: {type: Date, default: Date.now}
})
TimeOffTypePolicySettingSchema.index({company:1,timeOffPolicy:1}, {unique:true})

export {TimeOffTypePolicySettingSchema}
export interface TimeOffTypePolicySetting extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly timeOffPolicy: TimeOffTypePolicy|  mongoose.Schema.Types.ObjectId|string,
    readonly duration: number,
    readonly includeDayOff: boolean,
    readonly allowHalfDay: boolean,
    // readonly setScheduleHalfDay: boolean,
    readonly setDefault: boolean,

    readonly emergedAtJoin: boolean,

    readonly show: boolean,
    readonly maxRequest: number,
    readonly allowMinus: boolean,
    readonly minusAmount: number,
    readonly carryForward: boolean,
    readonly carryAmound: number,
    readonly carryExpired: number,
    readonly timeOffCompensation: boolean,
    readonly attachmentMandatory: boolean,
    readonly updatedAt: Date,
    readonly updatedBy: mongoose.Schema.Types.ObjectId|User
}