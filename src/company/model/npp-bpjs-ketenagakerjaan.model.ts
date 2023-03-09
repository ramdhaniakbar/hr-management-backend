import * as mongoose from 'mongoose';
import { User } from 'src/users/user.model';
import { jkkRate } from '../enum';
import { Company } from './company.model';

export const NppBpjsKetenagakerjaanSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  nppName: { type: String, required: true },
  nppNumber: { type: Number },
  jkk: { type: mongoose.Schema.Types.Decimal128, enum: jkkRate },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now },
});

export interface NppBpjsKetenagakerjaan extends mongoose.Document {
  readonly company: Company;
  readonly nppName: string;
  readonly jkk: mongoose.Decimal128 | jkkRate;
  readonly createdAt: Date;
  readonly createdBy: User;
  readonly updatedAt: Date;
}
