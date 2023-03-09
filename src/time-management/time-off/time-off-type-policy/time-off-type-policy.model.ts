import * as mongoose from "mongoose"
import { Company, EmploymentStatus, JobLevel, OrganizationChart } from "src/company/model"
import { roundingTypes, timeOffPolicyTypes } from "src/enum"
import { User } from "src/users/user.model"

// !!! pada time off policy ada memiliki default time off policy yang berlaku untuk seluruh perusahaan
// time off policy defaultnya bisa disetting oleh masing masing perusahaan kembali di bagian time off setting
// jika menggunakan time off policy default maka pada saat dibuat company akan secara otomatis membuat time off policy defaultnya untuk perusahaan masing masing
export const TimeOffTypePolicySchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    policyName:{type: String},
    policyCode:{type: String},
    policyDescription:{type: String},
    //tanggal mulai kebikan bisa mulai dipakai oleh employee/user, dipakai pada saat ingin melakukan request time off 
    effectiveAsOf: {type: Date},
    defaultForNewEmployee:{type: Boolean},
    allNewEmployee:{type: Boolean},
    filter: {type:
        {
            organization:{type:[{organization: {type: mongoose.Schema.Types.ObjectId, ref: "OrganizationChart"}}]},
            jobLevel:{type:[{jobLevel: {type: mongoose.Schema.Types.ObjectId, ref: "JobLevel"}}]}
        }
    },
    unlimitedBalances:{type: Boolean},
    policyType: {type: String, enum: timeOffPolicyTypes},

    //if first emerge is not true then the policy will be defaulted to appearing at emerge day
    firstEmerge:{type: Boolean},

    //ketika effective from join date itu true maka employee akan mendapatkan akumulasi semua time off balance yang bisa didapatkan user dihitung mulai dari joined date user sampai saat dibuatnya balance user, untuk tipe policy anniversary secara default menggunakan effective from join date
    //ketika tidak effective from join date maka user hanya akan mendapatkan balance setelah user ditambahkan kedalam aplikasi dan mengikuti emerge dari policy untuk generate balance pada saat emergenya
    effectiveFromJoinDate:{type: Boolean},

    //prorate on first emerge menghitung berapa prorate saldo pada bulan pertama
    //misalnya kebijakan cuti annually diset untuk pemunculan pertama pada bulan juni - 
    //ketika employee joined pada september maka akan dikalkulasi berapa saldo cuti pada tahun annually pertama employee dengan menghitung saldo cuti untuk tahun pertama itu dibagi sesuai dengan berapa bulan employee telah bekerja -
    //dari contoh diatas maka employee telah bekerja selama 9-10 bulan berdasarkan setting lain maka dari itu employee mendapatkan 10 bulan nilai cuti dari total satu tahun yaitu sekitar 84% dari total cuti yang akan didapatkan dari satu tahun itu 
    prorateOnFirstEmerge :{type: Boolean},

    //jika filter emerge after/first emerge status terpenuhi ketika user balance dibuat maka user akan mendapatkan saldo cuti untuk bulan itu ataupun mendapatkan seluruh akumulasi saldo cuti sesuai joined date user jika effective from joined date true
    emergeAfter: {type: Number},
    //kemungkinan first emerge status membuat policy mulai berlaku ketika user telah mengganti statusnya ke status pada first emerge status sehingga kalkulasi from join date setelah status user berubah
    //tetapi untuk sementara first emerge status tidak menggunakan mulai kapan user ganti status ke status first emerge status melainkan kita menganggap user statusnya dari awal adalah status yang dia miliki sekarang dan kalkulasi mulai dari join datenya akan melalui statusnya sekarang
    //untuk kalkulasi per bulan maka akan menegecek employment status user yang memiliki policynya apakah employment status mereka sudah sesuai dengan first emerge status jika belum maka tidak ditambah balance jika sudah baru ditambah
    firstEmergeStatus: {type:[{employmentStatus:{type: mongoose.Schema.Types.ObjectId, ref: "EmploymentStatus" }}]},

    //menentukan Pembulatan masa kerja berdasarkan tanggal bergabung, menjadi satu bulan.
    //karyawan yang joined date sebelum hari pada joined day rounding akan mendapatkan saldo cuti pad bulan tersebut
    joinedDayRounding: {type: Number},

    //
    emergeDay :{type:{
        //tiap bulan berdasarkan tanggal joined date karyawan
        anniversary:{type: Boolean},
        customDays: {type: Number},
    }},
    annualDate: {type: Date},

    //expired
    months:{type: Number},
    policyDate:{type:
        {
            date:{type: Date},
            minimumExpiryMonth:{type: Number},
        }},
    //berdasarkan joinedDate karyawan
    anniversary:{type: Boolean},
    noExpiryDate:{type: Boolean},

    //rounding menggunakan prorate cuti yang telah didapatkan dari setting prorate cuti jika digunakan sehingga mendapatkan saldo dalam bentuk float/desimal sehingga pada rounding akan membulatkan keatas ataupun kebawah
    rounding: {type:
        [{
            from:{type: Number},
            to:{type: Number},
            rounding:{type: String, enum: roundingTypes},
        }]
    },

    //balance generated menggunakan sudah berapa tahun/bulan employee joined misalnya 1-3 tahun/ 1-12 bulan
    // jika balance generated memiliki filter yang sama maka filter yg paling pertamalah yg akan digunakan 
    balanceGenerated: {type:
        [{
            from:{type: Number},
            to:{type: Number},
            equal:{type: Number },
        }]
    },

    //bisa melakukan assign employee agar employee tertentu dapat memiliki time off policy walau tidak termasuk ke filter
    //assigned employee tidak di implementasikan untuk sementara dikarenakan employee yang ke assigned otomatis dibuat time off balancenya walau kosong
    //sehingga pada saat kalkulasi time off balance hanya melihat apakah user memiliki time off balance untuk mengetahui apakah user termasuk kedalam sebuah time off policy
    //sehingga membuat assigned employee redundan
    // assignedEmployee:{type:[{
    //     user:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
    // }]},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now}
})

export interface TimeOffTypePolicy extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly policyName: string,
    readonly policyCode: string,
    readonly policyDescription: string,

    //effective as of berlaku untuk kapan berjalannya policy tersebut, sehingga jika datenya adalah 10 maka balance untuk per employee hanya akan terbuat pada tgl 10 walau balancenya bisa dari berbulan yg lalu effectivenya
    readonly effectiveAsOf: Date,

    //policy akan berlaku ke employee yang baru ditambahkan/akan dibuat balance untuk employee yang baru ditambahkan jika sesuai dengan filternya
    //policy yang baru ditambahkan tidak akan langsung dimiliki oleh employee yang sudah ada pada perusahaan sebelum policy dibuat
    //employee lama hanya akan mendapatkan policy baru jika dilakukan assign policynya kepada employee tersebut
    readonly defaultForNewEmployee: boolean,
    readonly allNewEmployee: boolean,
    readonly filter: 
        {
            readonly organization:[{_id?: mongoose.Schema.Types.ObjectId,organization: mongoose.Schema.Types.ObjectId | OrganizationChart}],
            readonly jobLevel:[{_id?: mongoose.Schema.Types.ObjectId,jobLevel: mongoose.Schema.Types.ObjectId | JobLevel}]
        },
    readonly unlimitedBalances: boolean,
    readonly policyType: timeOffPolicyTypes|string,
    readonly firstEmerge: boolean,
    readonly effectiveFromJoinDate: boolean,
    readonly prorateOnFirstEmerge: boolean,
    
    //emerge after berdasarkan tanggal join karyawan
    readonly emergeAfter: number,
    readonly firstEmergeStatus:[{readonly _id?: mongoose.Schema.Types.ObjectId,
                            readonly employmentStatus: mongoose.Schema.Types.ObjectId| EmploymentStatus
                        }],
    readonly joinedDayRounding: number,
    readonly emergeDay: {
        readonly anniversary: boolean,
        readonly customDays: number,
    },
    readonly annualDate: Date,

    //expired
    readonly months: number,
    readonly policyDate:
        {
            readonly date: Date,
            readonly minimumExpiryMonth: number,
        },
    readonly anniversary: boolean,
    readonly noExpiryDate: boolean,

    readonly rounding:
    [{
        readonly from: number,
        readonly to: number,
        readonly rounding: string | roundingTypes,
    }],

    readonly balanceGenerated:
    [{
        readonly from: number,
        readonly to: number,
        readonly equal: number,
    }],
    readonly assignedEmployee:
    [{
        readonly user: mongoose.Schema.Types.ObjectId|User
    }],
    readonly createdAt: Date,
    readonly createdBy: mongoose.Schema.Types.ObjectId|User
}