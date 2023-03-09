import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { MasterOvertimeService } from '../master-overtime/master-overtime.service';
import { OvertimeDefault } from './overtime-default.model';

@Injectable()
export class OvertimeDefaultService {
  constructor(
    @InjectModel('OvertimeDefault')
    private readonly overtimeDefaultModel: Model<OvertimeDefault>,
    private readonly masterOvertimeService: MasterOvertimeService,
  ) {}

  async createOvertimeDefault(user: any, overtimeDefault: any) {
    const i = overtimeDefault;

    const companyexists = await this.checkCompany(user, i.company);
    if (companyexists) {
      throw new ForbiddenException('company exists');
    }

    // console.log('Validation success');
    const addOvertimeDefault = new this.overtimeDefaultModel({
      company: i.company,
      dayOff: i.dayOff,
      nationalHoliday: i.nationalHoliday,
      workingDay: i.workingDay,
    });
    await addOvertimeDefault.save();
    return addOvertimeDefault;
  }

  // async deleteOvertimeDefault(user: any, id: any) {
  //   await this.findOneOvertimeDefault(user, id);
  //   const result = await this.overtimeDefaultModel.deleteOne({
  //     _id: id,
  //   });
  //   return result;
  // }

  async findOneOvertimeDefault(user: any, id: any) {
    const findOneOvertimeDefault = await this.overtimeDefaultModel.findById(id);
    if (!findOneOvertimeDefault) {
      throw new NotFoundException('no master overtime employee with id ' + id);
    }
    let result = findOneOvertimeDefault.toObject();
    result.updatedAt = result.updatedAt.toLocaleString();
    return result;
  }

  async findAllOvertimeDefault(user: any) {
    const overtimeDefault = await this.overtimeDefaultModel
      .find({
        company: user.company,
      })
      .exec();

    let result = overtimeDefault.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async updateOvertimeDefault(user: any, edit: any) {
    let result = instanceToPlain(edit);

    const companyexists = await this.checkCompany(user, result.company);

    if (!companyexists) {
      throw new ForbiddenException('company does not exists');
    }

    await this.masterOvertimeService.findOneMasterOvertime(user, result.dayOff);

    await this.masterOvertimeService.findOneMasterOvertime(
      user,
      result.nationalHoliday,
    );

    await this.masterOvertimeService.findOneMasterOvertime(
      user,
      result.workingDay,
    );

    result.updatedAt = Date.now();
    result.updatedBy = user.sub;

    await this.overtimeDefaultModel.updateOne(
      { company: result.company },
      result,
    );
    return result;
  }

  async checkCompany(user: any, comp: any) {
    const company = await this.overtimeDefaultModel.findOne({
      company: user.company,
    });

    if (comp !== user.company) {
      throw new ForbiddenException(
        'company id does not match with your company id',
      );
    }

    return company;
  }
}
