import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { getThrBasedOn } from 'src/enum';
import { PayrollComponentAllowanceService } from '../payroll-component-allowance/payroll-component-allowance.service';
import { thrSettingDto } from './dto';
import { ThrSetting } from './thr-setting.model';

@Injectable()
export class ThrSettingService {
  constructor(
    @InjectModel('ThrSetting')
    private readonly thrSettingModel: Model<ThrSetting>,
    private readonly payrollComponentAllowanceService: PayrollComponentAllowanceService,
  ) {}

  async createThrSetting(user: any, thrSetting: thrSettingDto) {
    let i = instanceToPlain(thrSetting);

    if (i.thrType == getThrBasedOn.days && i.getThrAfterMonths) {
      throw new ForbiddenException(
        'get THR after months must be null if thr type is days',
      );
    }

    if (i.thrType == getThrBasedOn.monthly && i.getThrAfterDays) {
      throw new ForbiddenException(
        'get THR after days must be null if thr type is monthly',
      );
    }

    if (i.getThrAfterDays == null && i.getThrAfterMonths == null) {
      throw new ForbiddenException(
        'get THR after days and get THR after months should be not null',
      );
    }

    if (i.thrType == getThrBasedOn.days && i.getThrAfterDays) {
      i.getThrAfterMonths = null;
      i.rounding = null;
      i.noRounding = null;
    }

    if (i.thrType == getThrBasedOn.monthly && i.getThrAfterMonths) {
      i.getThrAfterDays = null;
      i.numberOfDays = null;

      if (i.noRounding === true) {
        i.rounding = null;
      }
    }

    await this.payrollComponentAllowanceService.findArrPayrollComponentAllowance(
      user,
      i.thrComponent,
    );

    i.company = user.company;

    let findAllThrSetting = await this.findAllThrSetting(user);

    findAllThrSetting.map((thrSetting) => {
      const userCompany = String(thrSetting.company);

      if (userCompany === i.company) {
        throw new ForbiddenException(
          'found duplicate company id of ' + i.company,
        );
      }
    });

    const result = await this.thrSettingModel.create(i);
    return result;
  }

  async findAllThrSetting(user: any) {
    const findAllThrSetting = await this.thrSettingModel
      .find({ company: user.company })
      .exec();

    if (!findAllThrSetting) {
      throw new ForbiddenException('no thr setting found with your company id');
    }

    let result = findAllThrSetting.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async findOneThrSetting(user: any, id: any) {
    const findOneThrSetting = await this.thrSettingModel.findById(id);

    if (!findOneThrSetting) {
      throw new ForbiddenException('no thr setting find by your id ' + id);
    }

    return findOneThrSetting;
  }

  async updateThrSetting(user: any, thrSetting: thrSettingDto, id: any) {
    await this.findOneThrSetting(user, id);

    const i = instanceToPlain(thrSetting);

    if (i.thrType == getThrBasedOn.days && i.getThrAfterMonths) {
      throw new ForbiddenException(
        'get THR after months must be null if thr type is days',
      );
    }

    if (i.thrType == getThrBasedOn.monthly && i.getThrAfterDays) {
      throw new ForbiddenException(
        'get THR after days must be null if thr type is monthly',
      );
    }

    if (i.getThrAfterDays == null && i.getThrAfterMonths == null) {
      throw new ForbiddenException(
        'get THR after days and get THR after months should be not null',
      );
    }

    if (i.thrType == getThrBasedOn.days && i.getThrAfterDays) {
      i.getThrAfterMonths = null;
      i.rounding = null;
      i.noRounding = null;
    }

    if (i.thrType == getThrBasedOn.monthly && i.getThrAfterMonths) {
      i.getThrAfterDays = null;
      i.numberOfDays = null;

      if (i.noRounding === true) {
        i.rounding = null;
      }
    }

    await this.payrollComponentAllowanceService.findArrPayrollComponentAllowance(
      user,
      i.thrComponent,
    );

    i.company = user.company;

    let findAllThrSetting = await this.findAllThrSetting(user);

    findAllThrSetting.map((thrSetting) => {
      const userCompany = String(thrSetting.company);

      if (userCompany !== i.company) {
        throw new ForbiddenException(
          "your company id doesn't match" + i.company,
        );
      }
    });

    const result = await this.thrSettingModel.updateOne(
      { _id: id },
      { $set: i },
    );

    return result;
  }
}
