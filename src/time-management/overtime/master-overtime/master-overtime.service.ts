import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { masterOvertimeDto } from './dto/master-overtime.dto';
import { MasterOvertime } from './master-overtime.model';

@Injectable()
export class MasterOvertimeService {
  constructor(
    @InjectModel('MasterOvertime')
    private readonly masterOvertimeModel: Model<MasterOvertime>,
  ) {}

  async createMasterOvertime(user: any, masterOvertime: masterOvertimeDto) {
    let i = masterOvertime;
    // console.log(i.noRounding);

    if (i.noRounding !== true) {
      if (i.rounding == null) {
        throw new ForbiddenException(
          'rounding should not be null when no rounding is false',
        );
      }
    }

    if (i.customMultiplier !== true && i.perDay == null) {
      throw new ForbiddenException(
        'perday should not be null if custom multiplier is false',
      );
    }

    if (i.customMultiplier === true && i.perDay != null) {
      throw new ForbiddenException(
        'custom multiplier should be false if per day is not null',
      );
    }

    if (i.customMultiplier !== true && i.perDay != null) {
      i.customMultiplierWeekDay = null;
      i.customMultiplierWeekend = null;
      i.amount = null;
      i.salary = null;
      i.tunjangan = null;
      i.formula = null;
    }

    if (i.customMultiplier === true && i.perDay == null) {
      if (
        [
          i.amount != null,
          i.salary != null,
          i.tunjangan != null,
          i.formula != null,
        ].filter(Boolean).length != 1
      ) {
        throw new ForbiddenException(
          'you should only pick one type of overtime rate',
        );
      }
    }

    let createMasterOvertime = instanceToPlain(i);
    createMasterOvertime.company = user.company;
    createMasterOvertime.createdBy = user.sub;

    const result = await this.masterOvertimeModel.create(createMasterOvertime);
    return result;
  }

  async findAllMasterOvertime(user: any) {
    const masterOvertime = await this.masterOvertimeModel.find({
      company: user.company,
    });

    if (!masterOvertime) {
      throw new NotFoundException(
        'no master overtime found with the your company id ',
      );
    }

    let result = masterOvertime.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
      i.updatedAt = i.updatedAt.toLocaleString();
    });

    return result;
  }

  async findOneMasterOvertime(user: any, id: any) {
    const masterOvertime = await this.masterOvertimeModel.findById(id);

    if (!masterOvertime) {
      throw new NotFoundException(
        'no master overtime found with the id: ' + id,
      );
    }

    let result = masterOvertime.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    result.updatedAt = result.updatedAt.toLocaleString();

    return result;
  }

  async updateOneMasterOvertime(user: any, masterOvertime: masterOvertimeDto) {
    let i = masterOvertime;

    if (!i._id) {
      throw new ForbiddenException('id not found, please add id');
    }

    await this.findOneMasterOvertime(user, i._id);

    if (i.noRounding !== true) {
      if (i.rounding === null) {
        throw new ForbiddenException(
          'rounding should not be null when no rounding is false',
        );
      }
    }

    if (i.customMultiplier !== true && i.perDay === null) {
      throw new ForbiddenException(
        'perday should not be null if custom multiplier is false',
      );
    }

    if (i.customMultiplier === true && i.perDay !== null) {
      throw new ForbiddenException(
        'custom multiplier should be false if per day is not null',
      );
    }

    if (i.customMultiplier !== true && i.perDay !== null) {
      i.customMultiplierWeekDay = null;
      i.customMultiplierWeekend = null;
      i.amount = null;
      i.salary = null;
      i.tunjangan = null;
      i.formula = null;
    }

    if (i.customMultiplier === true && i.perDay === null) {
      if (
        [
          i.amount !== null,
          i.salary !== null,
          i.tunjangan !== null,
          i.formula !== null,
        ].filter(Boolean).length != 1
      ) {
        throw new ForbiddenException(
          'you should only pick one type of overtime rate',
        );
      }
    }

    let updatedMasterOvertime = instanceToPlain(i);
    updatedMasterOvertime.updatedAt = Date.now();
    const result = await this.masterOvertimeModel.updateOne(
      { _id: updatedMasterOvertime._id },
      updatedMasterOvertime,
    );
    return result;
  }

  async deleteOneMasterOvertime(user: any, id: any) {
    await this.findOneMasterOvertime(user, id);
    const deletedMasterOvertime = await this.masterOvertimeModel.deleteOne({
      _id: id,
    });
    return deletedMasterOvertime;
  }
}
