import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CashAdvanceSettlement } from './cash-advance-settlement.mocel';

@Injectable()
export class CashAdvanceSettlementService {
    constructor(@InjectModel('CashAdvanceSettlement') private readonly cashAdvanceSettlement: Model<CashAdvanceSettlement>){}
}
