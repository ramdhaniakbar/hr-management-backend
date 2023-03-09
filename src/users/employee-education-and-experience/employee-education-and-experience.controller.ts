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
import { ValidateObjectId } from '../pipes/validate-object-id.pipe';
import { FormalEducationDto } from './dto/formal-education.dto';
import { IdFormalEducationDto } from './dto/id-formal-education.dto';
import { IdInformalEducationDto } from './dto/id-informal-education.dto';
import { IdWorkingExperienceDto } from './dto/id-working-experience.dto';
import { InformalEducationDto } from './dto/informal-education.dto';
import { WorkingExperienceDto } from './dto/working-experience.dto';
import { EmployeeEducationAndExperienceService } from './employee-education-and-experience.service';

@UseGuards(JwtAuthGuard)
@Controller('employee-education-and-experience')
export class EmployeeEducationAndExperienceController {
  constructor(
    private employeeEducationAndExperienceService: EmployeeEducationAndExperienceService,
  ) {}

  @Post()
  async createEmployeeEducationAndExperience(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() employeeEducationAndExperience: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.createEmployeeEducationExperience(
        user,
        employeeEducationAndExperience,
      );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Patch('add-formal-education/:id')
  async addFormalEducation(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() formalEducationDto: FormalEducationDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.addFormalEducation(
        user,
        id,
        formalEducationDto,
      );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Get()
  async getAllEmployeeEducationAndExperience(
    @UserDoc() user: any,
    @Res() res: Response,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.findEmployeeEducationExperience(
        user,
      );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Patch('edit-formal-education/:id')
  async editFormalEducation(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() formalEducationDto: IdFormalEducationDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.editFormalEducation(
        user,
        id,
        formalEducationDto,
      );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Patch('delete-formal-education/:id')
  async deleteFormalEducation(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() formalEducationDto: IdFormalEducationDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.deleteFormalEducation(
        user,
        id,
        formalEducationDto,
      );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Patch('add-informal-education/:id')
  async addInformalEducation(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() informalEducationDto: InformalEducationDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.addInformalEducation(
        user,
        id,
        informalEducationDto,
      );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Patch('edit-informal-education/:id')
  async editInformalEducation(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() informalEducationDto: IdInformalEducationDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.editInformalEducation(
        user,
        id,
        informalEducationDto,
      );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Patch('delete-informal-education/:id')
  async deleteInformalEducation(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() informalEducationDto: IdInformalEducationDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.deleteInformalEducation(
        user,
        id,
        informalEducationDto,
      );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Patch('add-working-experience/:id')
  async addWorkingExperience(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() workingExperienceDto: WorkingExperienceDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.addWorkingExperience(
        user,
        id,
        workingExperienceDto,
      );
    return res.status(HttpStatus.OK).json({ return: result });
  }

  @Patch('edit-working-experience/:id')
  async editWorkingExperience(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() workingExperienceDto: IdWorkingExperienceDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.editWorkingExperience(
        user,
        id,
        workingExperienceDto,
      );
    return res.status(HttpStatus.OK).json({ return: result });
  }

  @Patch('delete-working-experience/:id')
  async deleteWorkingExperience(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() workingExperienceDto: IdWorkingExperienceDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.employeeEducationAndExperienceService.deleteWorkingExperience(
        user,
        id,
        workingExperienceDto,
      );
    return res.status(HttpStatus.OK).json({ return: result });
  }
}
