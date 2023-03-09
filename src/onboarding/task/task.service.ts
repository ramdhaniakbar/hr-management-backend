import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly task: Model<Task>){}
}
