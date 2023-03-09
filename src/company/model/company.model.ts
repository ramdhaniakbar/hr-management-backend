import * as mongoose from "mongoose"
import { customFieldType, jkkRate } from "../enum"
import * as argon from 'argon2'
import { MasterStateProvince, MasterUmr } from "src/master-table/model"

const CompanySchema = new mongoose.Schema({
    email: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    companyName:{type:String },
    companyPhoneNumber:{type:String},
    companyAddress:{type:String},
    postalCode:{type: String},
    stateOrProvince:{type: mongoose.Schema.Types.ObjectId, ref: "MasterStateProvince"},
    city:{type: mongoose.Schema.Types.ObjectId, ref: "MasterStateProvince.city"},
    umr:{type: mongoose.Schema.Types.ObjectId, ref: "MasterUmr"},
    companyLogo:{type:String, default:"logo.jpg"},
    noBpjsKetenagakerjaan: {type: String},
    jkk: {type: Number, enum: jkkRate},
    companyNpwp: {type: String},
    companyTaxableDate:{type: Date},
    taxPersonName:{type:String},
    taxPersonNpwp:{type:String},
    kodeKlu: {type: String},
    scannedSignature:{type: String, default: "signature.png"},
    employeeQuota:{type: Number, default: 50},
    picEmail:{type: String},
    picPhoneNumber:{type: String},
    createdAt: {type: Date, default: Date.now},
}

)

export interface Company extends mongoose.Document{
    readonly email:string,
    readonly password:string,
    readonly companyName:string,
    readonly companyPhoneNumber:string,
    readonly companyAddress:string,
    readonly postalCode:string,
    readonly stateOrProvince: mongoose.Schema.Types.ObjectId | MasterStateProvince,
    readonly city: mongoose.Schema.Types.ObjectId,
    readonly umr: mongoose.Schema.Types.ObjectId | MasterUmr,
    readonly companyLogo:string,
    readonly noBpjsKetenagakerjaan:string,
    readonly jkk: number | jkkRate,
    readonly companyNpwp:string,
    readonly companyTaxableDate:Date,
    readonly taxPersonName:string,
    readonly taxPersonNpwp:string,
    readonly kodeKlu:string,
    readonly scannedSignature:string,
    readonly employeeQuota:number,
    readonly picEmail: string,
    readonly picPhoneNumber: string,
    readonly createdAt: Date,
 }

 CompanySchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password') || user.password.startsWith("$argon") ) return next();
        // hash the password using our new salt
        const hash = argon.hash(user.password)
        hash.then(pass => {user.password = pass 
                next()})
});


// CompanySchema.pre('findOneAndUpdate', async function() {
//     var user = this.update

//     // const hash = await argon.hash(this.password)
//     const temp =  user.getUpdate()

//     console.log(temp)
//     // this.setUpdate({password:"xxxxxxxxxxx"})
//     // if (docToUpdate.password !== this.getUpdate()) {
//     //   const newPassword = await argon.hash(this._update.password, 10)
//     //   this._update.password = newPassword
//     // }
//   })





export {CompanySchema}
//  export const CompanySchema = mongoose.model("Company", CompanySc)