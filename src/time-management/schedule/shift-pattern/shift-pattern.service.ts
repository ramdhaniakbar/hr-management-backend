import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShiftDetailTypeService } from '../shift-detail-type/shift-detail-type.service';
import { shiftPatternDto } from './dto';
import { ShiftPattern } from './shift-pattern.model';

@Injectable()
export class ShiftPatternService {
  constructor(
    @InjectModel('ShiftPattern')
    private readonly shiftPatternModel: Model<ShiftPattern>,
    private shiftDetailTypeService: ShiftDetailTypeService,
  ) {}

  async createShiftPattern(user: any, shiftPattern: shiftPatternDto) {
    // const
    let array = shiftPattern.shift;
    for (let index = 0; index < array.length; index++) {
      await this.shiftDetailTypeService.findOneShiftDetailType(
        user,
        array[index].shift,
      );
    }

    const result = await this.shiftPatternModel.create({
      company: user.company,
      patternName: shiftPattern.patternName,
      shift: shiftPattern.shift,
      createdBy: user.sub,
    });
    return result;
  }

  async findOneShiftPattern(user: any, id: any) {
    const shiftPattern = await this.shiftPatternModel
      .findById(id)
      .populate('shift.shift');
    if (!shiftPattern) {
      throw new NotFoundException('no shift pattern found with the id: ' + id);
    }
    let result = shiftPattern.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    result.shift.map((i) => {
      i.shift.in = i.shift.in.toLocaleString();
      i.shift.out = i.shift.out.toLocaleString();
      i.shift.breakIn = i.shift.breakIn.toLocaleString();
      i.shift.breakOut = i.shift.breakOut.toLocaleString();
      i.shift.otBefore = i.shift.otBefore.toLocaleString();
      i.shift.otAfter = i.shift.otAfter.toLocaleString();
    });
    return result;
  }

  async deleteOneShiftPattern(user: any, id: any) {
    await this.findOneShiftPattern(user, id);
    const result = await this.shiftPatternModel.deleteOne({ _id: id });
    return result;
  }

  async findAllShiftPattern(user: any) {
    const shiftPatterns = await this.shiftPatternModel.find({
      company: user.company,
    });
    let result = shiftPatterns.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
    });

    return result;
  }
}
