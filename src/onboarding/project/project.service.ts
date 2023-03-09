import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.model';

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private readonly project: Model<Project>){}
}
