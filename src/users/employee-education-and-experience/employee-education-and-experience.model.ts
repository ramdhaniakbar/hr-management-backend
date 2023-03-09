import * as mongoose from 'mongoose';
import { Company } from 'src/company/model';
import { durationTypes, educationGrades } from 'src/enum';
import { User } from 'src/users/user.model';

export const EmployeeEducationAndExperienceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  formalEducation: {
    type: [
      {
        grade: { type: String, enum: educationGrades },
        institutionName: { type: String },
        major: { type: String },
        start: { type: Date },
        end: { type: Date },
        score: { type: String },
      },
    ],
  },
  informalEducation: {
    type: [
      {
        educationName: { type: String },
        heldBy: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        durationType: { type: String, enum: durationTypes },
        duration: { type: Number },
        fee: { type: Number },
        description: { type: String },
        haveCertificate: { type: Boolean },
        attachFile: { type: String },
      },
    ],
  },
  workingExperience: {
    type: [
      {
        company: { type: String },
        jobPosition: { type: String },
        from: { type: Date },
        to: { type: Date },
        lengthOfService: { type: Number },
      },
    ],
  },
  cv: { type: String },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface EmployeeEducationAndExperience extends mongoose.Document {
  readonly user: User | mongoose.Schema.Types.ObjectId;
  readonly company: Company | mongoose.Schema.Types.ObjectId;
  readonly formalEducation: [
    {
      readonly _id?: mongoose.Schema.Types.ObjectId;
      readonly grade: string | educationGrades;
      readonly institutionName: string;
      readonly major: string;
      readonly start: Date | string;
      readonly end: Date | string;
      readonly score: string;
    },
  ];
  readonly informalEducation: [
    {
      readonly _id?: mongoose.Schema.Types.ObjectId;
      readonly educationName: string;
      readonly heldBy: string;
      readonly startDate: Date | string;
      readonly endDate: Date | string;
      readonly durationType: string | durationTypes;
      readonly duration: number;
      readonly fee: number;
      readonly description: string;
      readonly haveCertificate: boolean;
      readonly attachFile: string;
    },
  ];
  readonly workingEperience: [
    {
      readonly _id?: mongoose.Schema.Types.ObjectId;
      readonly company: string;
      readonly jobPosition: string;
      readonly from: Date | string;
      readonly to: Date | string;
      readonly lengthOfService: number;
    },
  ];
  readonly cv: string;
  readonly updatedBy: User | mongoose.Schema.Types.ObjectId;
  readonly updatedAt: Date;
}
