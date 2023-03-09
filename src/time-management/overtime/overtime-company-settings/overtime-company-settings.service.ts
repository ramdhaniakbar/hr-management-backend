import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentScheduleService } from 'src/payroll/payment-schedule/payment-schedule.service';
import { ShiftDetailTypeService } from 'src/time-management/schedule/shift-detail-type/shift-detail-type.service';
import { overtimeCompanySettingsDto } from './dto/overtime.company.settings.dto';
import { OvertimeCompanySettings } from './overtime-company-settings.model';

@Injectable()
export class OvertimeCompanySettingsService {
  constructor(
    @InjectModel('OvertimeCompanySettings')
    private readonly overtimeCompanySettingsModel: Model<OvertimeCompanySettings>,
    private readonly shiftDetailTypeService: ShiftDetailTypeService,
    private readonly paymentScheduleService: PaymentScheduleService,
  ) {}

  async createOvertimeCompanySettings(
    user: any,
    overtimeCompanySettings: overtimeCompanySettingsDto,
  ) {
    let i = overtimeCompanySettings;

    const overtimeCompany = await this.findAllOvertimeCompanySettings(user);
    if (overtimeCompany.length >= 1) {
      throw new ForbiddenException('overtime company settings already exist');
    }

    if (
      i.overtimeCompesation.default === true &&
      i.overtimeCompesation.overrideIdr != null
    ) {
      throw new ForbiddenException(
        'overtime compensation override must null if default true',
      );
    } else if (
      i.overtimeCompesation.default === false &&
      i.overtimeCompesation.overrideIdr == null
    ) {
      throw new ForbiddenException(
        'overtime compensation default must true if override null',
      );
    }

    if (i.automaticOvertimeSetting.allowAutoRequest !== true) {
      i.automaticOvertimeSetting.sendEmailAuto = null;
      i.automaticOvertimeSetting.minimalOvertimeBefore = null;
      i.automaticOvertimeSetting.minimalOvertimeAfter = null;
      i.automaticOvertimeSetting.overtimeBreakBefore = null;
      i.automaticOvertimeSetting.overtimeBreakAfter = null;
    }

    await this.shiftDetailTypeService.findOneShiftDetailType(
      user,
      i.dayOffShiftType,
    );

    await this.paymentScheduleService.findOnePaymentSchedule(
      user,
      i.overtimePaymentSchedule,
    );

    const result = await this.overtimeCompanySettingsModel.create({
      company: user.company,
      noRounding: i.noRounding,
      rounding: i.rounding,
      multiplierWorkingDays: i.multiplierWorkingDays,
      dayOffShiftType: i.dayOffShiftType,
      multiplierDayOff: i.multiplierDayOff,
      overtimeCompensation: i.overtimeCompesation,
      minimalOvertimePayment: i.minimalOvertimePayment,
      automaticOvertimeSetting: i.automaticOvertimeSetting,
      overtimePaymentSchedule: i.overtimePaymentSchedule,
    });
    return result;
  }

  async findAllOvertimeCompanySettings(user: any) {
    const overtimeCompany = await this.overtimeCompanySettingsModel.find({
      company: user.company,
    });

    if (!overtimeCompany) {
      throw new NotFoundException(
        'no overtime company found with the your company id ',
      );
    }

    let result = overtimeCompany.map((i) => {
      return i.toObject();
    });

    return result;
  }

  async findOneOvertimeCompanySettings(user: any, id: any) {
    const overtimeCompany = await this.overtimeCompanySettingsModel.findById(
      id,
    );

    if (!overtimeCompany) {
      throw new NotFoundException(
        'no overtime company found with the id ' + id,
      );
    }

    return overtimeCompany;
  }

  async updateOneOvertimeCompanySettings(
    user: any,
    edit: overtimeCompanySettingsDto,
  ) {
    if (edit._id === undefined || edit._id === '') {
      throw new ForbiddenException('please input the _id');
    }

    await this.findOneOvertimeCompanySettings(user, edit._id);

    if (
      edit.overtimeCompesation.default === true &&
      edit.overtimeCompesation.overrideIdr != null
    ) {
      throw new ForbiddenException(
        'overtime compensation override must null if default true',
      );
    } else if (
      edit.overtimeCompesation.default === false &&
      edit.overtimeCompesation.overrideIdr == null
    ) {
      throw new ForbiddenException(
        'overtime compensation default must true if override null',
      );
    }

    if (edit.automaticOvertimeSetting.allowAutoRequest !== true) {
      edit.automaticOvertimeSetting.sendEmailAuto = null;
      edit.automaticOvertimeSetting.minimalOvertimeBefore = null;
      edit.automaticOvertimeSetting.minimalOvertimeAfter = null;
      edit.automaticOvertimeSetting.overtimeBreakBefore = null;
      edit.automaticOvertimeSetting.overtimeBreakAfter = null;
    }

    await this.shiftDetailTypeService.findOneShiftDetailType(
      user,
      edit.dayOffShiftType,
    );

    await this.paymentScheduleService.findOnePaymentSchedule(
      user,
      edit.overtimePaymentSchedule,
    );

    const result = await this.overtimeCompanySettingsModel.updateOne(
      {
        _id: edit._id,
      },
      edit,
    );

    return result;
  }

  // async deleteOneOvertimeCompanySettings(user: any, id: any) {
  //   await this.findOneOvertimeCompanySettings(user, id);
  //   const deletedOvertimeCompany =
  //     await this.overtimeCompanySettingsModel.deleteOne({ _id: id });
  //   return deletedOvertimeCompany;
  // }
}
