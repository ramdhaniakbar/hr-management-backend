import * as mongoose from 'mongoose';
import { Company } from 'src/company/model';
import { PayrollComponentAllowance } from 'src/payroll/payroll-component-allowance/payroll-component-allowance.model';
import { User } from 'src/users/user.model';

export const MasterOvertimeSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  masterOvertimeName: { type: String },
  noRounding: { type: Boolean },
  rounding: {
    type: [
      {
        from: { type: Number },
        to: { type: Number },
        roundingInto: { type: Number },
      },
    ],
  },
  perDay: { type: Number },
  customMultiplier: { type: Boolean },
  customMultiplierWeekDay: {
    type: [
      {
        from: { type: Number },
        to: { type: Number },
        multiply: { type: Number },
      },
    ],
  },
  customMultiplierWeekend: {
    type: [
      {
        from: { type: Number },
        to: { type: Number },
        multiply: { type: Number },
      },
    ],
  },
  amount: { type: Number },
  salary: { type: Number },
  tunjangan: {
    type: {
      tunjanganType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PayrollComponentAllowance',
      },
      totalTunjangan: { type: Number },
    },
  },
  formula: { type: String, default: 'formula' },
  minimalPaymentBefore: { type: Number },
  minimalPaymentAfter: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface MasterOvertime extends mongoose.Document {
  readonly company: Company | mongoose.Schema.Types.ObjectId;
  readonly masterOvertimeName: string;
  readonly noRounding: boolean;
  readonly rounding: [
    {
      readonly from: number;
      readonly to: number;
      readonly roundingInto: number;
    },
  ];
  readonly customMultiplier: boolean;
  readonly multiplierWeekDay: [
    {
      readonly from: number;
      readonly to: number;
      readonly multiply: number;
    },
  ];
  readonly multiplierWeekend: [
    {
      readonly from: number;
      readonly to: number;
      readonly multiply: number;
    },
  ];
  readonly amount: number;
  readonly salary: number;
  readonly tunjangan: {
    readonly tunjanganType:
      | mongoose.Schema.Types.ObjectId
      | PayrollComponentAllowance;
    readonly totalTunjangan: number;
  };
  readonly formula: string;
  readonly minimalPaymentBefore: number;
  readonly minimalPaymentAfter: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly createdBy: mongoose.Schema.Types.ObjectId | User;
}
