import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { attendanceMachineSettingDto } from './dto';
import { AttendanceMachineSetting } from './attendance-machine-setting.model';
import { instanceToPlain } from 'class-transformer';
import { attendanceTypes, delimiters, fileTypes, flagTypes } from 'src/enum';

@Injectable()
export class AttendanceMachineSettingService {
  constructor(
    @InjectModel('AttendanceMachineSetting')
    private readonly attendanceMachineSettingModel: Model<AttendanceMachineSetting>,
  ) {}

  async createattendanceMachineSetting(
    user: any,
    attendaceMachineSetting: attendanceMachineSettingDto,
  ) {
    const i = attendaceMachineSetting;

    //attendance Type single row
    if(i.attendanceType === attendanceTypes.singleRow){
      if((i.checkIn == null || i.checkOut == null) || (i.time != null || i.timeLength != null || i.flagType)){
        throw new ForbiddenException("Single row shouldn't have time, timeLength, flagType, mode, modeLength, flagIn, flagOut, infter, inBefore, outAfter, outBefore, onOff and should have checkIn, checkOut")
      }
    }

    //attendanceType multiple row
    if(i.attendanceType === attendanceTypes.multipleRow){
      if((i.time == null || !i.flagType) || (i.checkIn != null || i.checkInLength != null || i.checkOut != null || i.checkOutLength != null)){
        throw new ForbiddenException("Multiple row shouldn't have checkIn, checkInLength, checkOut, checkOutLength")
      }
    }

    //fileType csv
    if(i.fileType === fileTypes.csv){
      if(i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null || i.delimiter === delimiters.noDelimiter){
        throw new ForbiddenException("fileType csv shouldn't have delimiterType No Delimiter, barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //fileType xlsx
    if(i.fileType === fileTypes.xlsx){
      if(i.delimiter || i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null){
        throw new ForbiddenException("file type xlsx shouldn't have delimiter, barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //no delimiter
      if(i.delimiter === delimiters.noDelimiter){
        if(i.barcodeLength == null || i.dateLength == null){
          throw new ForbiddenException("No Delimiter should have barcodeLength, dateLength")
        }
      }

    //delimiter semicolon
    if(i.delimiter === delimiters.semicolon){
      if(i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null){
        throw new ForbiddenException("delimiter semicolon shouldn't have barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //delimiter coma
    if(i.delimiter === delimiters.coma){
      if(i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null){
        throw new ForbiddenException("delimiter coma shouldn't have barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //delimiter tab
    if(i.delimiter === delimiters.tab){
      if(i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null){
        throw new ForbiddenException("delimiter tab shouldn't have barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //flagtype OnOff
    if(i.flagType === flagTypes.OnOff){
      if((i.mode == null || i.flagIn == null || i.flagOut == null) || (i.inAfter != null || i.inBefore != null || i.outAfter != null || i.outBefore != null || i.onOff != null)){
        throw new ForbiddenException("flagType OnOff shouldn't have infter, inBefore, outAfter, outBefore, onOff")
      }
    }

    //flagtype Range
    if(i.flagType === flagTypes.range){
      if((i.inAfter == null || i.inBefore == null || i.outAfter == null || i.outBefore == null || i.onOff == null) || (i.mode != null || i.flagIn != null || i.flagOut != null)){
        throw new ForbiddenException("flagType Range shouldn't have mode, flagIn, flagOut")
      }
    }

    //flagType Time COmpare
    if(i.flagType === flagTypes.timeCompare){
      if(i.inAfter != null || i.inBefore != null || i.outAfter != null || i.outBefore != null || i.onOff != null || i.mode != null || i.flagIn != null || i.flagOut != null){
        throw new ForbiddenException("flagType Time Compare shouldn't have mode, flag in, flag out, in after, in before, out after, out before, onOff")
      }
    }

    let createattendanceMachineSetting = instanceToPlain(i);
    createattendanceMachineSetting.company = user.company;
    createattendanceMachineSetting.createdBy = user.sub;

    console.log(createattendanceMachineSetting)
    const result = await this.attendanceMachineSettingModel.create(
      createattendanceMachineSetting
    );

    return result;
  }

  async findOneattendanceMachineSetting(user: any, id: any) {
    const attendanceMachineSetting =
      await this.attendanceMachineSettingModel.findById(id);
    if (!attendanceMachineSetting) {
      throw new ForbiddenException(
        'no attendance machine setting found with the id: ' + id,
      );
    }
    let result = attendanceMachineSetting.toObject();
    result.createdAt = result.createdAt.toLocaleString();

    return result;
  }

  async findAllattendanceMachineSetting(user: any) {
    const attendaceMachineSetting =
      await this.attendanceMachineSettingModel.find({ company: user.company });

    if (attendaceMachineSetting.length == 0) {
      throw new ForbiddenException(
        'no attendance machine setting found with the your company id ',
      );
    }
    let result = attendaceMachineSetting.map((i) => {
      return i.toObject();
    });
    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
    });
    return result;
  }

  async deleteOneattendanceMachineSetting(user: any, id: any) {
    await this.findOneattendanceMachineSetting(user, id);
    const deleteattendanceMachineSetting =
      await this.attendanceMachineSettingModel.deleteOne({ _id: id });
    return deleteattendanceMachineSetting;
  }

  async updateAttendanceMachineSetting(user: any, attendaceMachineSetting: attendanceMachineSettingDto, id: any) {

    await this.findOneattendanceMachineSetting(user, id)
    const i = instanceToPlain(attendaceMachineSetting)

    //attendance Type single row
    if(i.attendanceType === attendanceTypes.singleRow){
      if((i.checkIn == null || i.checkOut == null) || (i.time != null || i.timeLength != null || i.flagType)){
        throw new ForbiddenException("Single row shouldn't have time, timeLength, flagType, mode, modeLength, flagIn, flagOut, infter, inBefore, outAfter, outBefore, onOff and should have checkIn, checkOut")
      }
    }

    //attendanceType multiple row
    if(i.attendanceType === attendanceTypes.multipleRow){
      if((i.time == null || !i.flagType) || (i.checkIn != null || i.checkInLength != null || i.checkOut != null || i.checkOutLength != null)){
        throw new ForbiddenException("Multiple row shouldn't have checkIn, checkInLength, checkOut, checkOutLength")
      }
    }

    //fileType csv
    if(i.fileType === fileTypes.csv){
      if(i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null || i.delimiter === delimiters.noDelimiter){
        throw new ForbiddenException("fileType csv shouldn't have delimiterType No Delimiter, barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //fileType xlsx
    if(i.fileType === fileTypes.xlsx){
      if(i.delimiter || i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null){
        throw new ForbiddenException("file type xlsx shouldn't have delimiter, barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //no delimiter
    if(i.delimiter === delimiters.noDelimiter){
      if(i.barcodeLength == null || i.dateLength == null){
        throw new ForbiddenException("No Delimiter should have barcodeLength, dateLength")
      }
    }
    
    //delimiter semicolon
    if(i.delimiter === delimiters.semicolon){
      if(i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null){
        throw new ForbiddenException("delimiter semicolon shouldn't have barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //delimiter coma
    if(i.delimiter === delimiters.coma){
      if(i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null){
        throw new ForbiddenException("delimiter coma shouldn't have barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //delimiter tab
    if(i.delimiter === delimiters.tab){
      if(i.barcodeLength != null || i.checkInLength != null || i.checkOutLength != null || i.dateLength != null || i.timeLength != null || i.modeLength != null){
        throw new ForbiddenException("delimiter tab shouldn't have barcodeLength, checkInLength, checkOutLength, dateLength, timeLength, modeLength")
      }
    }

    //flagtype OnOff
    if(i.flagType === flagTypes.OnOff){
      if((i.mode == null || i.flagIn == null || i.flagOut == null) || (i.inAfter != null || i.inBefore != null || i.outAfter != null || i.outBefore != null || i.onOff != null)){
        throw new ForbiddenException("flagType OnOff shouldn't have infter, inBefore, outAfter, outBefore, onOff")
      }
    }

    //flagtype Range
    if(i.flagType === flagTypes.range){
      if((i.inAfter == null || i.inBefore == null || i.outAfter == null || i.outBefore == null || i.onOff == null) || (i.mode != null || i.flagIn != null || i.flagOut != null)){
        throw new ForbiddenException("flagType Range shouldn't have mode, flagIn, flagOut")
      }
    }

    //flagType Time COmpare
    if(i.flagType === flagTypes.timeCompare){
      if(i.inAfter != null || i.inBefore != null || i.outAfter != null || i.outBefore != null || i.onOff != null || i.mode != null || i.flagIn != null || i.flagOut != null){
        throw new ForbiddenException("flagType Time Compare shouldn't have mode, flag in, flag out, in after, in before, out after, out before, onOff")
      }
    }

      const result = await this.attendanceMachineSettingModel.updateOne({_id:id},{$set: i})
      return result
    }
  }
