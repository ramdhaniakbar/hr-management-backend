import * as mongoose from "mongoose"
import { Company} from "src/company/model"
import { mailTypes, requestStatuses, requestTypes } from "src/enum"
import { User } from "src/users/user.model"

//delegation secara default akan mengisi user yang request dan akan mengirim notif kepada user yang ingin didelegate untuk user yang didelegate bisa mengaccept requestnya jika diaccep maka untuk range waktu start dan end maka usernya akan mendapatkan seluruh request yang akan diterima user yg mendelegasikan ke dia
// !!! pada saat mengirim segala macam request harus ada validasi untuk mengecek apakah ada delegation request dari user yg ingin dikirim requestnya
//ketika seseorang user mendelegasi approval requestnya maka orang yang didelegasikan akan mendapatkan  notif sama dengan orang asalnya jg akan mendapatkan notif
export const RequestDelegationSchema =  new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref: "Company"},
    delegateFrom: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    delegateTo: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    startDate: {type: Date},
    endDate: {type: Date},
    notes: {type: String},

    // kemungkinan menggunakan mailTypes yang sudah sama dengan yg ada pada inbox dapat memudahkan validasinya nanti
    requestType: {type:[String], enum: mailTypes},
    status: {type: String, enum: requestStatuses},
    comment:{type: String},
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now}, 
})

export interface RequestDelegation extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly delegateFrom: User | mongoose.Schema.Types.ObjectId, 
    readonly delegateTo: User | mongoose.Schema.Types.ObjectId,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly notes: string,
    readonly requestType: [mailTypes | string],
    readonly status: requestStatuses|string,
    readonly comment: string,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId, 
    readonly createdAt: Date,
}