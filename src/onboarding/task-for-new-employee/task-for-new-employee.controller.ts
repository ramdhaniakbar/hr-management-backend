import {
  Controller,
  Body,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { TaskForNewEmployeeDto } from './dto/task-for-new-employee.dto';
import { TaskForNewEmployeeService } from './task-for-new-employee.service';

@UseGuards(JwtAuthGuard)
@Controller('task-for-new-employee')
export class TaskForNewEmployeeController {
  constructor(
    private readonly taskForNewEmployeeService: TaskForNewEmployeeService,
  ) {}

  @Post()
  async createTaskForNewEmployee(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() taskForNewEmployee: TaskForNewEmployeeDto,
  ) {
    const result =
      await this.taskForNewEmployeeService.createTaskForNewEmployee(
        user,
        taskForNewEmployee,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get(':id')
  async getTaskForNewEmployee(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.taskForNewEmployeeService.findOneTask(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get()
  async getAllTaskForNewEmployee(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.taskForNewEmployeeService.findAllTask(user);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Patch()
  async editTaskForNewEmployee(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() update: any,
  ) {
    const result = await this.taskForNewEmployeeService.updateTask(update);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Delete()
  async deleteTaskForNewEmployee(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() id: any,
  ) {
    const result = await this.taskForNewEmployeeService.deleteTask(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }
}
