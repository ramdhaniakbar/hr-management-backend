import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestAttendance } from './request-attendance.model';

@Injectable()
export class RequestAttendanceService {
    constructor(@InjectModel('RequestAttendance')private readonly requestAttendanceModel: Model<RequestAttendance>){}
}
