import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeEmployeeStatus } from './change-employee-status.model';

@Injectable()
export class ChangeEmployeeStatusService {
    constructor(@InjectModel('ChangeEmployeeStatus') private readonly changeEmployeeStatus: Model<ChangeEmployeeStatus>){}
}
