import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestChangeShift } from './request.change.shift.model';

@Injectable()
export class RequestChangeShiftService {
    constructor(@InjectModel('RequestChangeShift')private readonly requestChangeShiftModel: Model<RequestChangeShift>){}
}
