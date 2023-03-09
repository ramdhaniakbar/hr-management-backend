import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { taskTypes } from '../../../enum/task-type.enum';

export class TaskForNewEmployeeDto {
  @IsNotEmpty()
  @IsBoolean()
  taskForInviter: boolean;

  @IsNotEmpty()
  @IsEnum(taskTypes)
  type: taskTypes;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @IsNotEmpty()
  @IsString()
  fileUpload: string;
}
