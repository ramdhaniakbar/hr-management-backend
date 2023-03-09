import * as mongoose from 'mongoose';
import { Company } from 'src/company/model';
import { dividedByTypes } from 'src/enum';
import { typeTimeOffCompensation } from 'src/enum/type-time-off-compensation.enum';
import { User } from 'src/users/user.model';
import { PayrollComponentAllowance } from '../payroll-component-allowance/payroll-component-allowance.model';

export const TimeOffCompensationSettingSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    unique: true,
  },
  typeOffCompensation: {
    type: String,
    enum: typeTimeOffCompensation,
  },
  amount: { type: Number },
  component: {
    type: [
      {
        allowance: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'PayrollComponentAllowance',
        },
      },
    ],
  },
  dividedBy: {
    type: String,
    enum: dividedByTypes,
  },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface TimeOffCompensationSetting extends mongoose.Document {
  readonly company: Company | mongoose.Schema.Types.ObjectId;
  readonly typeOffCompensation: string | typeTimeOffCompensation;
  readonly amount: number;
  readonly component: [
    {
      readonly _id?: mongoose.Schema.Types.ObjectId;
      readonly allowance:
        | mongoose.Schema.Types.ObjectId
        | PayrollComponentAllowance;
    },
  ];
  readonly dividedBy: string | dividedByTypes;
  readonly updatedAt: Date;
  readonly updatedBy: mongoose.Schema.Types.ObjectId | User;
}
