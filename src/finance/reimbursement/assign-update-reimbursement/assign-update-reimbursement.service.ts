import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssignUpdateReimbursement } from './assign-update-reimbursement.model';

@Injectable()
export class AssignUpdateReimbursementService {
    constructor(@InjectModel('AssignUpdateReimbursement') private readonly assignUpdateReimbursementModel: Model<AssignUpdateReimbursement>){}
}
