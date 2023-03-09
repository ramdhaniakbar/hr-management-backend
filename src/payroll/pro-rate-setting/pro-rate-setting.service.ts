import { Injectable, ForbiddenException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { prorateSettingTypes } from 'src/enum';
import { prorateSettingDto } from './dto';
import { ProRateSetting } from './pro-rate-setting.model';

@Injectable()
export class ProRateSettingService {

    constructor(@InjectModel('ProRateSetting')private readonly proRateSettingModel: Model<ProRateSetting>){}

    async createProrateSetring(user:any, prorateSetting: prorateSettingDto){
        
        const alreadyExist = await this.checkProrateSetting(user)
        if(alreadyExist){
            throw new ForbiddenException("your company already have a prorate setting, can't create another one")
        }

        const i = instanceToPlain(prorateSetting)

        if(i.prorateSettingType === prorateSettingTypes.basedOnWorkingDay || i.prorateSettingType === prorateSettingTypes.customOnWorkingDay){
            if(prorateSetting.countNationalHoliday == null){
                throw new ForbiddenException("prorate setting type with working day should have countNationalHoliday")
            }
        }

        if(i.prorateSettingType === prorateSettingTypes.customOnCalendarDay || i.prorateSettingType === prorateSettingTypes.customOnWorkingDay){
            if(prorateSetting.customNumber == null){
                throw new ForbiddenException("prorate setting type of custom should have customNumber")
            }
        }
        if(i.prorateSettingType === prorateSettingTypes.basedOnWorkingDay || i.prorateSettingType === prorateSettingTypes.basedOnCalendarDay){
            if(prorateSetting.customNumber != null){
                throw new ForbiddenException("prorate setting type of based on working day and calendar day shouldn't have customNumber")
            }
        }

        if(i.prorateSettingType === prorateSettingTypes.basedOnCalendarDay || i.prorateSettingType === prorateSettingTypes.customOnCalendarDay ){

            if(prorateSetting.countNationalHoliday != null){
                throw new ForbiddenException("prorate setting type of based and custom on calendar day shouldn't have countNationalHoliday")
            }
        }

        i.updatedBy = user.sub
        i.company = user.company
        const result = await this.proRateSettingModel.create(i)

        return result
    }

    async findProrateSetting(user:any){
        const prorateSetting = await this.proRateSettingModel.find({company: user.company})

        if(prorateSetting.length == 0){
            throw new NotFoundException("there is no prorate setting in your company")
        }
        let result = prorateSetting.map((i)=>{
            return i.toObject()
        })

        result.map((i)=>{
            i.updatedAt = i.updatedAt.toLocaleString()  
        })
        return result
    }

    async checkProrateSetting(user:any){
        const prorateSetting = await this.proRateSettingModel.find({company: user.company})

        if(prorateSetting.length == 0){
            return false
        }
        return true
    }

    async editProrateSetting(user:any, prorateSetting: prorateSettingDto){
        await this.findProrateSetting(user)
        
        const i = instanceToPlain(prorateSetting)

        if(i.prorateSettingType === prorateSettingTypes.basedOnWorkingDay || i.prorateSettingType === prorateSettingTypes.customOnWorkingDay){
            if(prorateSetting.countNationalHoliday == null){
                throw new ForbiddenException("prorate setting type with working day should have countNationalHoliday")
            }
        }

        if(i.prorateSettingType === prorateSettingTypes.customOnCalendarDay || i.prorateSettingType === prorateSettingTypes.customOnWorkingDay){
            if(prorateSetting.customNumber == null){
                throw new ForbiddenException("prorate setting type of custom should have customNumber")
            }
        }
        if(i.prorateSettingType === prorateSettingTypes.basedOnWorkingDay || i.prorateSettingType === prorateSettingTypes.basedOnCalendarDay){
            if(prorateSetting.customNumber != null){
                throw new ForbiddenException("prorate setting type of based on working day and calendar day shouldn't have customNumber")
            }
        }

        if(i.prorateSettingType === prorateSettingTypes.basedOnCalendarDay || i.prorateSettingType === prorateSettingTypes.customOnCalendarDay ){

            if(prorateSetting.countNationalHoliday != null){
                throw new ForbiddenException("prorate setting type of based and custom on calendar day shouldn't have countNationalHoliday")
            }
        }

        i.updatedBy = user.sub
        i.updatedAt = Date.now()
        const result = await this.proRateSettingModel.updateOne({company: user.company}, {$set:i})

        return result
    }

}
