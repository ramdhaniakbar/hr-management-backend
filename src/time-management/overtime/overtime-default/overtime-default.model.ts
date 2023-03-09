import * as mongoose from 'mongoose';
import { Company } from 'src/company/model';
import { User } from 'src/users/user.model';
import { MasterOvertime } from '../master-overtime/master-overtime.model';

export const OvertimeDefaultSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    unique: true,
  },
  dayOff: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterOvertime' },
  nationalHoliday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MasterOvertime',
  },
  workingDay: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterOvertime' },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface OvertimeDefault extends mongoose.Document {
  readonly company: Company | mongoose.Schema.Types.ObjectId;
  readonly dayOff: mongoose.Schema.Types.ObjectId | MasterOvertime;
  readonly workingDay: mongoose.Schema.Types.ObjectId | MasterOvertime;
  readonly nationalHoliday: mongoose.Schema.Types.ObjectId | MasterOvertime;
  readonly updatedAt: Date;
  readonly updatedBy: mongoose.Schema.Types.ObjectId | User;
}
