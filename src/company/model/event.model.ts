import * as mongoose from 'mongoose';
import { User } from 'src/users/user.model';
import { Company } from './company.model';

export const EventSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  eventName: { type: String, required: true },
  eventDate: { type: Date },
  eventDuration: { type: Number },
  companyHoliday: { type: Boolean },
  startTime: { type: Date },
  endTime: { type: Date },
  view: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now },
});

export interface Event extends mongoose.Document {
  readonly company: Company;
  readonly eventName: string;
  readonly eventDate: Date;
  readonly eventDuration: number;
  readonly companyHoliday: boolean;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly view: [User | mongoose.Schema.Types.ObjectId];
  readonly note: string;
  readonly createdAt: Date;
  readonly createdBy: User;
  readonly updatedAt: Date;
}
