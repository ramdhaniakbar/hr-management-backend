import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityLog } from './activity-log.model';

@Injectable()
export class ActivityLogService {
    constructor(@InjectModel('ActivityLog') private readonly activityLog: Model<ActivityLog>){}
}
