import * as mongoose from 'mongoose';
import { Company } from 'src/company/model';
import { PaymentSchedule } from 'src/payroll/payment-schedule/payment-schedule.model';
import { ShiftDetailType } from 'src/time-management/schedule/shift-detail-type/shift-detail-type.model';

export const OvertimeCompanySettingsSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
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
  multiplierWorkingDays: {
    type: [
      {
        from: { type: Number },
        to: { type: Number },
        multiply: { type: Number },
      },
    ],
  },
  dayOffShiftType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShiftDetailType',
  },
  multiplierDayOff: {
    type: [
      {
        from: { type: Number },
        to: { type: Number },
        multiply: { type: Number },
      },
    ],
  },
  overtimeCompesation: {
    type: {
      default: { type: Boolean },
      overrideIdr: { type: Number },
    },
  },
  minimalOvertimePayment: {
    type: {
      minimalPaymentBefore: { type: Number },
      minimalPaymentAfter: { type: Number },
    },
  },
  automaticOvertimeSetting: {
    type: {
      allowAutoRequest: { type: Boolean },
      sendEmailAuto: { type: Boolean },
      minimalOvertimeBefore: { type: Number },
      minimalOvertimeAfter: { type: Number },
      overtimeBreakBefore: { type: Number },
      overtimeBreakAfter: { type: Number },
    },
  },
  overtimePaymentSchedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentSchedule',
  },
});

export interface OvertimeCompanySettings extends mongoose.Document {
  readonly company: Company | mongoose.Schema.Types.ObjectId;
  readonly noRounding: boolean;
  readonly rounding: [
    {
      readonly from: number;
      readonly to: number;
      readonly roundingInto: number;
    },
  ];
  readonly multiplierWorkingDays: [
    {
      readonly from: number;
      readonly to: number;
      readonly multiply: number;
    },
  ];
  readonly dayOffShiftType: ShiftDetailType | mongoose.Schema.Types.ObjectId;
  readonly multiplierDayOff: [
    {
      readonly from: number;
      readonly to: number;
      readonly multiply: number;
    },
  ];
  readonly overtimeCompensation: {
    readonly default: boolean;
    readonly overrideIdr: number;
  };
  readonly minimalOvertimePayment: {
    readonly minimalPaymentBefore: number;
    readonly minimalPaymentAfter: number;
  };
  readonly automaticOvertimeSetting: {
    readonly allowAutoRequest: boolean;
    readonly sendEmail: boolean;
    readonly minimalOvertimeBefore: number;
    readonly minimalOvertimeAfter: number;
    readonly overtimeBreakBefore: number;
    readonly overtimeBreakAfter: number;
  };
  readonly overtimePaymentSchedule:
    | mongoose.Schema.Types.ObjectId
    | PaymentSchedule;
}
