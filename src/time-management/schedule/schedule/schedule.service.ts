import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShiftPatternService } from '../shift-pattern/shift-pattern.service';
import { scheduleDto } from './dto';
import { Schedule } from './schedule.model';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectModel('Schedule')private readonly scheduleModel: Model<Schedule>,
        private readonly shiftPatternService:ShiftPatternService){}

    async createSchedule(user:any, schedule:scheduleDto){

        const shiftPattern = await this.shiftPatternService.findOneShiftPattern(user,schedule.pattern)
        let initialShift = shiftPattern.shift.find((i)=> i.shift._id == schedule.initialShift )
        if(!initialShift){
            throw new NotFoundException("there is no initial shift with the id "+ schedule.initialShift+" from the pattern with the id + " +schedule.pattern) 
        }
        const duplicate =  await this.scheduleModel.findOne({scheduleName: schedule.scheduleName, company: user.company})
        if(duplicate){
            throw new ForbiddenException("the schedule name must be unique") 
        }
        const result = await this.scheduleModel.create({
            company: user.company,
            scheduleName: schedule.scheduleName,
            pattern: schedule.pattern,
            effectiveDate: schedule.effectiveDate,
            initialShift: schedule.initialShift,
            overrideNationalHoliday: schedule.overrideNationalHoliday,
            overrideCompanyHoliday: schedule.overrideCompanyHoliday,
            flexible: schedule.flexible,
            includeLateInLateOut: schedule.includeLateInLateOut,
            createdBy: user.sub,
        })

        return result
    }

    async findAllSchedule(user:any){
        const schedules = await this.scheduleModel.find({company:user.company})
        if(schedules.length == 0){
            throw new NotFoundException("no schedule found with your company id ")
        }

        let result = schedules.map((i)=>{
            return i.toObject()
        })
        result.map((i)=>{
            i.createdAt = i.createdAt.toLocaleString()
            i.effectiveDate = i.effectiveDate.toLocaleString()
        })
        return result
    }

    async findOneSchedule(user:any, id:any){
        const schedule = await this.scheduleModel.findById(id).populate({path:"pattern initialShift"})
        if(!schedule){
            throw new NotFoundException("no schedule found with the id: "+id)
        }
        let result = schedule.toObject()
        result.effectiveDate = result.effectiveDate.toLocaleString()
        result.createdAt = result.createdAt.toLocaleString()
        result.initialShift.in = result.initialShift.in.toLocaleString()
        result.initialShift.out = result.initialShift.out.toLocaleString()
        result.initialShift.otBefore = result.initialShift.otBefore.toLocaleString()
        result.initialShift.otAfter = result.initialShift.otAfter.toLocaleString()
        result.initialShift.breakOut = result.initialShift.breakOut.toLocaleString()
        result.initialShift.breakIn = result.initialShift.breakIn.toLocaleString()
        return result
    }

    async deleteOneSchedule(user:any, id:any){
        await this.findOneSchedule(user,id)

        //validasi apakah schedule sedang digunakan employee jika iya tidak bisa delete

        const deletedSchedule = await this.scheduleModel.deleteOne({_id:id})

        return deletedSchedule
    }

    //not yet implemented
    async clearSchedule(){

    }
}
