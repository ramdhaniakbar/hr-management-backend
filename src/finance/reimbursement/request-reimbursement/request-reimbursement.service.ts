import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestReimbursement } from './request-reimbursement.model';

@Injectable()
export class RequestReimbursementService {
    constructor(@InjectModel('RequestReimbursement')private readonly requestReimbursementModel: Model<RequestReimbursement>){}
}
