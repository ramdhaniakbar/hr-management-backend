import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskForNewEmployeeDto } from './dto/task-for-new-employee.dto';
import { TaskForNewEmployee } from './task-for-new-employee.model';

@Injectable()
export class TaskForNewEmployeeService {
  constructor(
    @InjectModel('TaskForNewEmployee')
    private readonly taskForNewEmployeeModel: Model<TaskForNewEmployee>,
  ) {}

  async createTaskForNewEmployee(
    user: any,
    taskForNewEmployee: TaskForNewEmployeeDto,
  ) {
    const createdTaskForNewEmployee = await this.taskForNewEmployeeModel.create(
      {
        company: user.company,
        taskForInviter: taskForNewEmployee.taskForInviter,
        type: taskForNewEmployee.type,
        taskDescription: taskForNewEmployee.taskDescription,
        fileUpload: taskForNewEmployee.fileUpload,
        createdBy: user.sub,
      },
    );
    return createdTaskForNewEmployee;
  }

  async checkTask(id: any, boolean: any) {
    const findTask = await this.findOneTask(id);
    if (findTask.taskForInviter !== boolean) {
      throw new NotFoundException(
        'no task for inviter or employee found with the id :' + id,
      );
    }
    return findTask;
  }

  async findOneTask(id: any) {
    const task = await this.taskForNewEmployeeModel.findById(id);
    if (!task) {
      throw new NotFoundException('no task found with the id :' + id);
    }

    let result = task.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    return result;
  }

  async findAllTask(user: any) {
    const task = await this.taskForNewEmployeeModel.find({
      company: user.company,
    });
    if (!task) {
      throw new NotFoundException('no task found with the your company id');
    }
    let result = task.map((i) => {
      return i.toObject();
    });
    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
    });
    return result;
  }

  async updateTask(update: any) {
    await this.findOneTask(update._id);
    const updatedTask = await this.taskForNewEmployeeModel.updateOne(
      { _id: update._id },
      {
        $set: {
          taskForInviter: update.taskForInviter,
          type: update.type,
          taskDescription: update.taskDescription,
          fileUpload: update.fileUpload,
        },
      },
    );
    return updatedTask;
  }

  async deleteTask(id: any) {
    await this.findOneTask(id._id);
    const deletedTask = await this.taskForNewEmployeeModel.deleteOne({
      _id: id._id,
    });
    return deletedTask;
  }
}
