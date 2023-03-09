import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyFiles } from './my-files.model';

@Injectable()
export class MyFilesService {
    constructor(@InjectModel('MyFiles') private readonly inbox: Model<MyFiles>){}
}
