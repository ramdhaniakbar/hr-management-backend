import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestOvertime } from './request-overtime.model';

@Injectable()
export class RequestOvertimeService {
    constructor(@InjectModel('RequestOvertime') private readonly requestOvertime: Model<RequestOvertime>){}
}
