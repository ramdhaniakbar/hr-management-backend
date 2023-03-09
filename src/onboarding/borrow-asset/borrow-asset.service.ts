import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BorrowAsset } from './borrow-asset.model';

@Injectable()
export class BorrowAssetsService {
    constructor(@InjectModel('BorrowAsset') private readonly borrowAsset: Model<BorrowAsset>){}
}
