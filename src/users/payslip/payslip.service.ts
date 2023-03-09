import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payslip } from './payslip.model';

@Injectable()
export class PayslipService {
    constructor(@InjectModel('Payslip') private readonly payslip: Model<Payslip>){}
}
