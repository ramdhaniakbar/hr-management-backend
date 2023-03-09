import * as mongoose from "mongoose"
import { Company } from "src/company/model"
import * as argon from 'argon2'
import { Schedule } from "src/time-management/schedule/schedule/schedule.model";
import { createdByTypes } from "src/enum";

const UserSchema = new mongoose.Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    employeeId: {type:String},
    email: {type: String, unique: true, required: true},
    password: {type:{
        passwordChangeTime:{type: Date, default: Date.now()},
        password:{type:String, required: true},
        passwordChangedBy:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
    }},
    name:{ type: String},
    payslipPassword: {type:{
        payslipPasswordChangeTime:{type: Date},
        payslipPassword:{type:String},
        payslipPasswordChangedBy:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
    }},
    profilePict:{type: String, default: "profile.png"},
    organization: {type: mongoose.Schema.Types.ObjectId, ref:"OrganizationChart"},
    jobLevel: {type: mongoose.Schema.Types.ObjectId, ref:"JobLevel"},
    grade: {type: mongoose.Schema.Types.ObjectId, ref:"Grade"},
    class: {type: mongoose.Schema.Types.ObjectId, ref:"Class"},
    schedule: {type:{
        currentSchedule: {type:mongoose.Schema.Types.ObjectId, ref:"Schedule"},
        effectiveDate: {type: Date},
        assignSchedule: {type:mongoose.Schema.Types.ObjectId, ref:"Schedule"}
    }},
    barcode: {type: String},
    joinedDate: {type: Date},
    endStatusDate: {type: Date},
    employmentStatus: {type: mongoose.Schema.Types.ObjectId, ref:"EmploymentStatus"},
    approvalLine: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    createdBy:{type: mongoose.Schema.Types.ObjectId, refPath:"model_type"},
    createdAt: {type: Date, default: Date.now},
    activationDate: {type: Date},
    model_type: {type:String, enum: createdByTypes}
})

UserSchema.index({company:1,employeeId:1}, {unique: true})
UserSchema.index({company:1,barcode:1}, {unique: true})

export interface User extends mongoose.Document{
    readonly company: Company | mongoose.Schema.Types.ObjectId,
    readonly employeeId: string,
    readonly email: string,
    readonly password: {
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly password: string,
        readonly passwordChangeTime: Date,
        readonly passwordChangedBy: User | mongoose.Schema.Types.ObjectId | string,
    },
    readonly name: string,
    readonly payslipPassword: {
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly payslipPassword: string,
        readonly payslipPasswordChangeTime: Date,
        readonly payslipPasswordChangedBy: User | mongoose.Schema.Types.ObjectId | string,
    },
    readonly profilePict: string,
    readonly organization: string,
    readonly jobLevel: string,
    readonly grade: string,
    readonly class: string,
    readonly schedule: {
        readonly _id?: mongoose.Schema.Types.ObjectId,
        readonly assignSchedule: Schedule| mongoose.Schema.Types.ObjectId | string,
        readonly effectiveDate: Date,
        readonly currentSchedule: Schedule| mongoose.Schema.Types.ObjectId | string,
    },
    readonly barcode: string,
    readonly employmentStatus: string,
    readonly joinedDate: Date,
    readonly endStatusDate: Date,
    readonly approvalLine: string,
    readonly activationDate: Date,
    readonly createdBy: User | mongoose.Schema.Types.ObjectId| string
    readonly createdAt: Date,
}

var UserModel = mongoose.model("User", UserSchema)

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
        // hash the password using our new salt
        const hash = argon.hash(user.password.password)
        hash.then(pass => {user.password.password = pass 
                next()})
});
     
export {UserSchema};
// export const UserS  = mongoose.model('User', UserSchema)
// module.exports = UserS