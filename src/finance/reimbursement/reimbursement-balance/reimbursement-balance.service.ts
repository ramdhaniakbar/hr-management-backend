import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReimbursementBalance } from './reimbursement-balance.model';

@Injectable()
export class ReimbursementBalanceService {
    constructor(@InjectModel('ReimbursementBalance') private readonly ReimbursementBalanceModel: Model<ReimbursementBalance>){}

}
