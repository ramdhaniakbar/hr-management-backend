import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { MasterOvertimeService } from '../master-overtime/master-overtime.service';
import { OvertimeDefaultService } from '../overtime-default/overtime-default.service';
import { CustomOvertimeDefault } from './custom-overtime-default.model';
import { customOvertimeDefaultDto } from './dto/customOvertimeDefault.dto';

@Injectable()
export class CustomOvertimeDefaultService {
  constructor(
    @InjectModel('CustomOvertimeDefault')
    private readonly customOvertimeDefaultModel: Model<CustomOvertimeDefault>,
    private readonly masterOvertimeService: MasterOvertimeService,
    private readonly companyService: CompanyService,
    private readonly overtimeDefaultService: OvertimeDefaultService,
  ) {}

  async createCustomOvertimeDefault(
    user: any,
    customOvertimeDefault: customOvertimeDefaultDto,
  ) {
    const i = instanceToPlain(customOvertimeDefault);

    await this.masterOvertimeService.findOneMasterOvertime(user, i.dayOff);

    await this.masterOvertimeService.findOneMasterOvertime(
      user,
      i.nationalHoliday,
    );

    await this.masterOvertimeService.findOneMasterOvertime(user, i.workingDay);

    // validate filterEmployee
    if (i.filterEmployee !== null) {
      await this.companyService.checkFilterOrgJobLv(i.filterEmployee);
    }

    i.company = user.company;

    const result = await this.customOvertimeDefaultModel.create(i);
    return result;
  }

  async findAllCustomOvertimeDefault(user: any) {
    const customOvertimeDefault = await this.customOvertimeDefaultModel
      .find({ company: user.company })
      .exec();

    if (!customOvertimeDefault) {
      throw new NotFoundException(
        'no custom overtime default with your company id',
      );
    }

    let result = customOvertimeDefault.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async findOneCustomOvertimeDefault(user: any, id: any) {
    const findOneCustomOvertimeDefault =
      await this.customOvertimeDefaultModel.findById(id);

    if (!findOneCustomOvertimeDefault) {
      throw new NotFoundException('no custom overtime default with id ' + id);
    }

    let result = findOneCustomOvertimeDefault.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    result.updatedAt = result.updatedAt.toLocaleString();
    return result;
  }

  async updateOneCustomOvertimeDefault(user: any, edit: any) {
    const i = instanceToPlain(edit);

    console.log(i._id);

    await this.findOneCustomOvertimeDefault(user, i._id);

    await this.masterOvertimeService.findOneMasterOvertime(user, i.dayOff);

    await this.masterOvertimeService.findOneMasterOvertime(
      user,
      i.nationalHoliday,
    );

    await this.masterOvertimeService.findOneMasterOvertime(user, i.workingDay);

    // validate filterEmployee
    if (i.filterEmployee !== null) {
      await this.companyService.checkFilterOrgJobLv(i.filterEmployee);
    }

    i.updatedAt = Date.now();
    i.updatedBy = user.sub;

    await this.customOvertimeDefaultModel.updateOne({ _id: i._id }, i);
    return i;
  }

  async deleteOneCustomOvertimeDefault(user: any, id: any) {
    await this.findOneCustomOvertimeDefault(user, id);
    const result = await this.customOvertimeDefaultModel.deleteOne({
      _id: id,
    });
    return result;
  }

  async findOvertimeDefaultByFilter(user:any, organization:any, jobLevel:any){
    const customOvertimeDefault = await this.customOvertimeDefaultModel.findOne(
      {$and:
        [
          {company:user.company}, 
          {"filterEmployee.organization.organization":{"$in":organization}},
          {"filterEmployee.jobLevel.jobLevel":{"$in":jobLevel}}
        ]
      }).lean()
      if(!customOvertimeDefault){
        const overtimeDefault = await this.overtimeDefaultService.findAllOvertimeDefault(user)
        return overtimeDefault[0]
      }
    return customOvertimeDefault
  }
}
