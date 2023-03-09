import * as mongoose from 'mongoose';
import { Company } from 'src/company/model';
import { taskTypes } from 'src/enum';
import { User } from 'src/users/user.model';

export const TaskForNewEmployeeSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  taskForInviter: { type: Boolean },
  type: { type: String, enum: taskTypes },
  taskDescription: { type: String },
  fileUpload: { type: String },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface TaskForNewEmployee extends mongoose.Document {
  readonly company: Company | mongoose.Schema.Types.ObjectId;
  readonly taskForInviter: boolean;
  readonly type: taskTypes | string;
  readonly taskDescription: string;
  readonly fileUpload: string;
  readonly createdAt: Date;
  readonly createdBy: User | mongoose.Schema.Types.ObjectId;
}
