import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionUpdatePayroll } from './transaction-update-payroll.model';

@Injectable()
export class TransactionUpdatePayrollService {
    constructor(@InjectModel('TransactionUpdatePayroll')private readonly transactionUpdatePayroll: Model<TransactionUpdatePayroll>){}
}
