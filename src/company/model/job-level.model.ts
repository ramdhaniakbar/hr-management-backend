import * as mongoose from 'mongoose';
import { User } from 'src/users/user.model';
import { Company } from './company.model';

export const JobLevelSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  jobLevelName: { type: String, required: true },
  level: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now },
});
JobLevelSchema.index({ company: 1, jobLevelName: 1 }, { unique: true });

export interface JobLevel extends mongoose.Document {
  readonly company: Company;
  readonly jobLevelName: string;
  readonly level: number;
  readonly createdAt: Date;
  readonly createdBy: User;
  readonly updatedAt: Date;
}
