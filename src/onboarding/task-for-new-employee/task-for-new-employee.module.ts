import { Module } from '@nestjs/common';
import { TaskForNewEmployeeService } from './task-for-new-employee.service';
import { TaskForNewEmployeeController } from './task-for-new-employee.controller';
import { TaskForNewEmployeeSchema } from './task-for-new-employee.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TaskForNewEmployee', schema: TaskForNewEmployeeSchema },
    ]),
  ],
  providers: [TaskForNewEmployeeService],
  controllers: [TaskForNewEmployeeController],
  exports: [TaskForNewEmployeeService],
})
export class TaskForNewEmployeeModule {}
