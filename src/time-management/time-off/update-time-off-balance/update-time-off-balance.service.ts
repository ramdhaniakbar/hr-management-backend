import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTimeOffBalance } from './update-time-off-balance.model';

@Injectable()
export class UpdateTimeOffBalanceService {

    constructor(@InjectModel('UpdateTimeOffBalance')private readonly updateTimeOffBalanceModel: Model<UpdateTimeOffBalance>){}

}
