import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { updateTimeOffTypeSettingDto } from './dto';
import { TimeOffTypePolicySetting } from './time-off-type-policy-setting.model';

@Injectable()
export class TimeOffTypePolicySettingService {
    constructor(
        @InjectModel("TimeOffTypePolicySetting") private readonly timeOffTypePolicySettingModel:Model<TimeOffTypePolicySetting>
    ){}

    async createTimeOffTypePolicySetting(user:any, policy:any){
        const result = await this.timeOffTypePolicySettingModel.create({
            company: user.company,
            timeOffPolicy: policy._id,
            updatedBy: user.sub
        })
        return result
    }

    async findTimeOffSettingSetDefault(user:any){
        const policySetting = await this.timeOffTypePolicySettingModel.find({
            company:user.company,
            setDefault: true
        }).populate("timeOffPolicy")
        if(policySetting.length >= 1){
            //membuat array yang berisi seluruh time off policy yang memiliki setDefault true
            const temp = policySetting.map((i)=>{
                return i.toObject()
            })
            const result = temp.map((i)=>{
                return i.timeOffPolicy
            })
            return result
        }
        //mengembalikan null ketika tidak ada yang setdefaul
        return null
    }

    async updateTimeOffTypePolicySetting(timeOffTypePolicySetting:updateTimeOffTypeSettingDto, user:any){
        let i = instanceToPlain(timeOffTypePolicySetting.timeOffTypePolicySettings)
        
        //validate data
        await this.findArrTimeOffPolicySetting(i)

        //update data
        let results = []
        for (let index = 0; index <i.length; index++) { 
            // let temp = instanceToPlain(i[index])
            i[index].updatedAt = Date.now()
            i[index].updatedBy = user.sub
            const updateTimeOffTypePolicySetting = await this.timeOffTypePolicySettingModel.updateOne({_id:i[index]._id},i[index])
            results.push(updateTimeOffTypePolicySetting)
        }

        return results
    }


    //when use to update data should not change toLocaleString for date
    async findArrTimeOffPolicySetting(i:any){
        for (let index = 0; index <i.length; index++) {      

            // !!! jika ditambahkan default time off policy maka harus ditambahkan validasi untuk mengetahui apakah merupakan default dan jika iya baru boleh menambahkan duration
            if(i[index].duration){
                throw new ForbiddenException("duration is only available for default time off policy")
            }
            let duplicate = i.filter(t => t._id === i[index]._id)
            if(duplicate.length > 1){
                throw new ForbiddenException("found duplicate time off policy setting with the id of " + i[index]._id)
            }
            const exist = await this.timeOffTypePolicySettingModel.findById(i[index]._id)
            if(!exist){
                throw new NotFoundException("no time off type policy found with the id " +i[index]._id+ " at array index"+index)
            }
        }
        return null
    }

    async findAllTimeOffTypePolicySetting(user:any){
        
        const timeOffTypePolicySettings = await this.timeOffTypePolicySettingModel.find({company:user.company})
        if(timeOffTypePolicySettings.length == 0){
            throw new NotFoundException("no Time Off Type Policy Settings found in your company ")
        }
        let results = timeOffTypePolicySettings.map((i)=>{
            return i.toObject()
        })

        results.map((i)=>{
            i.updatedAt = i.updatedAt.toLocaleString()
        })

        return results
    }

    async findOneTimeOffTypePolicySetting(timeOffPolicy:any){
        const result = await this.timeOffTypePolicySettingModel.findOne({timeOffPolicy:timeOffPolicy})
        console.log(result, timeOffPolicy)
        if(!result){
            throw new NotFoundException("can't find time off policy setting with the time off policy id of: "+timeOffPolicy)
        }
        return result

    }
}
