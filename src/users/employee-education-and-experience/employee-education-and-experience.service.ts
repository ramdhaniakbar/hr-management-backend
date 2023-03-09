import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormalEducationDto } from './dto/formal-education.dto';
import { IdFormalEducationDto } from './dto/id-formal-education.dto';
import { IdInformalEducationDto } from './dto/id-informal-education.dto';
import { IdWorkingExperienceDto } from './dto/id-working-experience.dto';
import { InformalEducationDto } from './dto/informal-education.dto';
import { WorkingExperienceDto } from './dto/working-experience.dto';
import { EmployeeEducationAndExperience } from './employee-education-and-experience.model';

@Injectable()
export class EmployeeEducationAndExperienceService {
  constructor(
    @InjectModel('EmployeeEducationAndExperience')
    private readonly employeeEducationAndExperienceModel: Model<EmployeeEducationAndExperience>,
  ) {}

  async createEmployeeEducationExperience(
    user: any,
    employeeEducationAndExperience: any,
  ) {
    const checkEmployee = await this.findEmployeeEducationExperience(user);

    if (checkEmployee) {
      throw new ForbiddenException(
        'employee education and experience available',
      );
    }

    const employeeEducationExperience =
      await this.employeeEducationAndExperienceModel.create({
        user: user.sub,
        company: user.company,
        cv: employeeEducationAndExperience.cv,
      });

    return employeeEducationExperience;
  }

  async findEmployeeEducationExperience(user: any) {
    const employeeEducationExperience =
      await this.employeeEducationAndExperienceModel.findOne({
        user: user.sub,
      });

    if (!employeeEducationExperience) {
      throw new NotFoundException('no employee education experience found');
    }

    return employeeEducationExperience;
  }

  async addFormalEducation(
    user: any,
    id: any,
    formalEducationDto: FormalEducationDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id },
      { $addToSet: { formalEducation: formalEducationDto } },
    );

    return result;
  }

  async editFormalEducation(
    user: any,
    id: any,
    formalEducationDto: IdFormalEducationDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id, 'formalEducation._id': formalEducationDto._id },
      {
        $set: { 'formalEducation.$': formalEducationDto },
      },
    );

    return result;
  }

  async deleteFormalEducation(
    user: any,
    id: any,
    formalEducationDto: IdFormalEducationDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id },
      { $pull: { formalEducation: { _id: Object(formalEducationDto._id) } } },
    );

    return result;
  }

  async addInformalEducation(
    user: any,
    id: any,
    informalEducationDto: InformalEducationDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id },
      { $addToSet: { informalEducation: informalEducationDto } },
    );

    return result;
  }

  async editInformalEducation(
    user: any,
    id: any,
    informalEducationDto: IdInformalEducationDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id, 'informalEducation._id': informalEducationDto._id },
      {
        $set: { 'informalEducation.$': informalEducationDto },
      },
    );

    return result;
  }

  async deleteInformalEducation(
    user: any,
    id: any,
    informalEducationDto: IdInformalEducationDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id },
      {
        $pull: { informalEducation: { _id: Object(informalEducationDto._id) } },
      },
    );

    return result;
  }

  async addWorkingExperience(
    user: any,
    id: any,
    workingExperienceDto: WorkingExperienceDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id },
      { $addToSet: { workingExperience: workingExperienceDto } },
    );

    return result;
  }

  async editWorkingExperience(
    user: any,
    id: any,
    workingExperienceDto: IdWorkingExperienceDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id, 'workingExperience._id': workingExperienceDto._id },
      {
        $set: { 'workingExperience.$': workingExperienceDto },
      },
    );

    return result;
  }

  async deleteWorkingExperience(
    user: any,
    id: any,
    workingExperienceDto: IdWorkingExperienceDto,
  ) {
    const employee = await this.employeeEducationAndExperienceModel.findOne({
      _id: id,
    });

    if (!employee) {
      throw new NotFoundException(
        'no employee found with the user id of ' + id,
      );
    }

    const result = await this.employeeEducationAndExperienceModel.updateOne(
      { _id: id },
      {
        $pull: { workingExperience: { _id: Object(workingExperienceDto._id) } },
      },
    );

    return result;
  }
}
