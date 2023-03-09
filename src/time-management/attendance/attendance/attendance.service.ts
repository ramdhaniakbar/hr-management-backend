import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './attendance.model';

@Injectable()
export class AttendanceService {
    constructor(@InjectModel('Attendance')private readonly attendanceModel: Model<Attendance>){}
}
