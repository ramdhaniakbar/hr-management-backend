import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoanName } from './models/loan-name.model';
import { Loan } from './models/loan.model';

@Injectable()
export class LoanService {
    constructor(@InjectModel('LoanName') private readonly loanNameModel: Model<LoanName>,
                @InjectModel('Loan') private readonly loanModel: Model<Loan>){}
}
