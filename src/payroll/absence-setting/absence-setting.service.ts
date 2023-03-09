import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { absenceTypes } from 'src/enum';
import { AbsenceSetting } from './absence-setting.model';
import { absenceSettingDto } from './dto';

@Injectable()
export class AbsenceSettingService {

    constructor(@InjectModel('AbsenceSetting')private readonly absenceSettingModel: Model<AbsenceSetting>){}

    async createAbsenceSetting(user:any, absenceSetting: absenceSettingDto){
        const alreadyExist = await this.checkAbsenceSetting(user)
        if(alreadyExist){
            throw new ForbiddenException("your company already have a absence setting, can't create another one")
        }
        if(absenceSetting.absenceAmountType == absenceTypes.basedOnCalendarDay || absenceSetting.absenceAmountType == absenceTypes.basedOnWorkingDay){
            if(absenceSetting.customNumber != null){
                throw new ForbiddenException("absence setting with the type based on calendar or working day shouldn't have custom number")
            }
        }else{
            if(absenceSetting.customNumber == null){
                throw new ForbiddenException("absence setting with the type Amount and Custom should have custom number")
            }
        }

        const createdAbsenceSetting = await this.absenceSettingModel.create({
            company: user.company,
            updatedBy: user.sub,
            absenceAmountType: absenceSetting.absenceAmountType,
            customNumber: absenceSetting.customNumber
        })

        return createdAbsenceSetting
        
    }

    async checkAbsenceSetting(user:any){
        const result = await this.absenceSettingModel.find({company:user.company})
        if(result.length == 0){
            return false
        }
        return true
    }


    async findAbsenceSetting(user:any){
        const absenceSetting = await this.absenceSettingModel.find({company:user.company})
        
        if(absenceSetting.length == 0){
            throw new NotFoundException("no absence setting found in your company")
        }
        let result = absenceSetting.map((i)=>{
            return i.toObject()
        })
        result.map((i)=>{
            i.updatedAt = i.updatedAt.toLocaleString() 
        })
        return result
    }

    async editAbsenceSetting(user:any, absenceSetting:absenceSettingDto){
        await this.findAbsenceSetting(user)

        if(absenceSetting.absenceAmountType == absenceTypes.basedOnCalendarDay || absenceSetting.absenceAmountType == absenceTypes.basedOnWorkingDay){
            if(absenceSetting.customNumber != null){
                throw new ForbiddenException("absence setting with the type based on calendar or working day shouldn't have custom number")
            }
        }else{
            if(absenceSetting.customNumber == null){
                throw new ForbiddenException("absence setting with the type Amount and Custom should have custom number")
            }
        }

        const result = await this.absenceSettingModel.updateOne({company: user.company}, {$set: absenceSetting})

        return result
    }
}
