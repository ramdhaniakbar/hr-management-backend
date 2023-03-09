import * as mongoose from 'mongoose';
import { Company } from 'src/company/model';
import {
  blood,
  genders,
  idTypes,
  marital,
  relationships,
  religion,
} from 'src/enum';
import { User } from 'src/users/user.model';

export const EmployeePersonalDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  mobilePhoneNo: { type: String },
  phoneNo: { type: String },
  placeOfBirth: { type: String },
  birthDate: { type: Date },
  gender: { type: String, enum: genders },
  maritalStatus: { type: String, enum: marital },
  bloodType: { type: String, enum: blood },
  religion: { type: String, enum: religion },
  identityAddress: {
    type: {
      idType: { type: String, enum: idTypes },
      idNumber: { type: String },
      idExpirationDate: { type: Date },
      permanent: { type: Boolean },
      postalCode: { type: String },
      citizenAddress: { type: String },
      useAsResidentalAddress: { type: Boolean },
      residentalAddress: { type: String },
    },
  },
  family: {
    type: [
      {
        fullName: { type: String },
        relationship: { type: String, enum: relationships },
        birthDate: { type: Date },
        idNumber: { type: String },
        maritalStatus: { type: String, enum: marital },
        gender: { type: String, enum: genders },
        job: { type: String },
        religion: { type: String, enum: religion },
        emergencyContact: { type: Boolean },
        phoneNumber: { type: String },
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface EmployeePersonalData extends mongoose.Document {
  readonly user: User | mongoose.Schema.Types.ObjectId;
  readonly company: Company | mongoose.Schema.Types.ObjectId;
  readonly mobilePhoneNo: string;
  readonly phoneNo: string;
  readonly placeOfBirth: string;
  readonly birthDate: Date;
  readonly gender: string | genders;
  readonly maritalStatus: string | marital;
  readonly bloodType: string | blood;
  readonly religion: string | religion;
  readonly identityAddress: {
    readonly _id?: mongoose.Schema.Types.ObjectId;
    readonly idType: string | idTypes;
    readonly idNumber: string;
    readonly idExpirationDate: Date;
    readonly permanent: boolean;
    readonly postalCode: string;
    readonly citizenAddress: string;
    readonly useAsResidentalAddress: boolean;
    readonly residentalAddress: string;
  };
  readonly family: [
    {
      readonly _id?: mongoose.Schema.Types.ObjectId;
      readonly fullName: string;
      readonly relationship: string | relationships;
      readonly birthDate: Date | string;
      readonly idNumber: string;
      readonly maritalStatus: string | marital;
      readonly gender: string | genders;
      readonly job: string;
      readonly religion: string | religion;
      readonly emergencyContact: boolean;
      readonly phoneNumber: string;
    },
  ];
  readonly updatedBy: User | mongoose.Schema.Types.ObjectId;
  readonly updatedAt: Date;
  readonly createdBy: User | mongoose.Schema.Types.ObjectId;
  readonly createdAt: Date;
}
