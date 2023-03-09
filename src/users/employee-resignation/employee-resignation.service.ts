import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeResignation } from './employee-resignation.model';

@Injectable()
export class EmployeeResignationService {
    constructor(@InjectModel('EmployeeResignation') private readonly employeeResignation: Model<EmployeeResignation>){}
}
