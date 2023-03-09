import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeTrackerHistory } from './time-tracker-history.model';

@Injectable()
export class TimeTrackerHistoryService {
    constructor(@InjectModel('TimeTrackerHistory') private readonly timeTrackerHistory: Model<TimeTrackerHistory>){}
}
