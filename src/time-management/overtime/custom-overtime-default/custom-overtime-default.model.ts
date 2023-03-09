import * as mongoose from 'mongoose';
import { Company, JobLevel, OrganizationChart } from 'src/company/model';
import { User } from 'src/users/user.model';
import { MasterOvertime } from '../master-overtime/master-overtime.model';

export const CustomOvertimeDefaultSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  customOvertimeDefaultName: { type: String },
  dayOff: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterOvertime' },
  nationalHoliday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MasterOvertime',
  },
  workingDay: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterOvertime' },
  filterEmployee: {
    type: {
      organization: {
        type: [
          {
            organization: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'OrganizationChart',
            },
          },
        ],
      },
      jobLevel: {
        type: [
          {
            jobLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'JobLevel' },
          },
        ],
      },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface CustomOvertimeDefault extends mongoose.Document {
  readonly company: Company | mongoose.Schema.Types.ObjectId;
  readonly customOvertimeDefaultName: string;
  readonly dayOff: mongoose.Schema.Types.ObjectId | MasterOvertime;
  readonly workingDay: mongoose.Schema.Types.ObjectId | MasterOvertime;
  readonly nationalHoliday: mongoose.Schema.Types.ObjectId | MasterOvertime;
  readonly filterEmployee: {
    readonly organization: [
      {
        _id?: mongoose.Schema.Types.ObjectId;
        organization: mongoose.Schema.Types.ObjectId | OrganizationChart;
      },
    ];
    readonly jobLevel: [
      {
        _id?: mongoose.Schema.Types.ObjectId;
        jobLevel: mongoose.Schema.Types.ObjectId | JobLevel;
      },
    ];
  };
  readonly updatedAt: Date;
  readonly updatedBy: mongoose.Schema.Types.ObjectId | User;
}
