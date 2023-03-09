import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReimbursementPolicy } from './reimbursement-policy.model';

@Injectable()
export class ReimbursementPolicyService {
    constructor(@InjectModel('ReimbursementPolicy') private readonly reimbursementPolicyModel: Model<ReimbursementPolicy>){}
}
