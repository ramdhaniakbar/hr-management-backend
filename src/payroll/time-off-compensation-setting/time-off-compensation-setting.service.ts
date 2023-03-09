import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { dividedByTypes } from 'src/enum';
import { typeTimeOffCompensation } from 'src/enum/type-time-off-compensation.enum';
import { PayrollComponentAllowanceService } from '../payroll-component-allowance/payroll-component-allowance.service';
import { timeOffCompensationSettingDto } from './dto/time-off-compensation-setting.dto';
import { TimeOffCompensationSetting } from './time-off-compensation-setting.model';

@Injectable()
export class TimeOffCompensationSettingService {
  constructor(
    @InjectModel('TimeOffCompensationSetting')
    private readonly timeOffCompensationSettingModel: Model<TimeOffCompensationSetting>,
    private readonly payrollComponentAllowanceService: PayrollComponentAllowanceService,
  ) {}

  async createTimeOffCompensationSetting(
    user: any,
    timeOffCompensationSetting: timeOffCompensationSettingDto,
  ) {
    let i = instanceToPlain(timeOffCompensationSetting);

    if (i.typeOffCompensation === typeTimeOffCompensation.amount) {
      i.component = null;
      // i.dividedBy = null;
    }

    if (i.typeOffCompensation === typeTimeOffCompensation.dividedBy) {
      i.amount = null;

      if (!i.dividedBy) {
        i.dividedBy = dividedByTypes.defaultProrateType;
      }

      await this.payrollComponentAllowanceService.findArrPayrollComponentAllowance(
        user,
        i.component,
      );
    }

    i.company = user.company;

    let findAllTimeOffCompensationSetting =
      await this.findAllTimeOffCompensationSetting(user);

    findAllTimeOffCompensationSetting.map((timeOffCompensationSetting) => {
      const userCompany = String(timeOffCompensationSetting.company);

      if (userCompany === i.company) {
        throw new ForbiddenException(
          'found duplicate company id of ' + i.company,
        );
      }
    });

    const result = await this.timeOffCompensationSettingModel.create(i);
    return result;
  }

  async findAllTimeOffCompensationSetting(user: any) {
    const findAllTimeOffCompensationSetting =
      await this.timeOffCompensationSettingModel
        .find({ company: user.company })
        .exec();

    if (!findAllTimeOffCompensationSetting) {
      throw new ForbiddenException(
        'no time off compensation setting found with your company id',
      );
    }

    let result = findAllTimeOffCompensationSetting.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async findOneTimeOffCompensationSetting(user: any, id: any) {
    const findOneTimeOffCompensationSetting =
      await this.timeOffCompensationSettingModel.findById(id);

    if (!findOneTimeOffCompensationSetting) {
      throw new ForbiddenException(
        'no time off compensation setting find by your id ' + id,
      );
    }

    return findOneTimeOffCompensationSetting;
  }

  async deleteTimeOffCompensationSetting(user: any, id: any) {
    await this.findOneTimeOffCompensationSetting(user, id);

    const deleteTimeOffCompensationSetting =
      await this.timeOffCompensationSettingModel.deleteOne({ _id: id });
    return deleteTimeOffCompensationSetting;
  }

  async updateTimeOffCompensationSetting(
    user: any,
    timeOffCompensationSetting: timeOffCompensationSettingDto,
    id: any,
  ) {
    await this.findOneTimeOffCompensationSetting(user, id);

    let i = instanceToPlain(timeOffCompensationSetting);

    if (i.typeOffCompensation === typeTimeOffCompensation.amount) {
      i.component = null;
      i.dividedBy = null;
    }

    if (i.typeOffCompensation === typeTimeOffCompensation.dividedBy) {
      i.amount = null;

      await this.payrollComponentAllowanceService.findArrPayrollComponentAllowance(
        user,
        i.component,
      );
    }

    i.company = user.company;

    let findAllTimeOffCompensationSetting =
      await this.findAllTimeOffCompensationSetting(user);

    findAllTimeOffCompensationSetting.map((timeOffCompensationSetting) => {
      const userCompany = String(timeOffCompensationSetting.company);

      if (userCompany !== i.company) {
        throw new ForbiddenException(
          "your company id doesn't match" + i.company,
        );
      }
    });

    const result = await this.timeOffCompensationSettingModel.updateOne(
      { _id: id },
      { $set: i },
    );

    return result;
  }
}
