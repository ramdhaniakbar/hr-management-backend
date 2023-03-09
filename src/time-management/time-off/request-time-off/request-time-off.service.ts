import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
const dayjs = require('dayjs');
import { Model } from 'mongoose';
import { mailTypes, requestStatuses, timeOffTypes } from 'src/enum';
import { halfDayTypes } from 'src/enum/half-day-types.enum';
import { InboxService } from 'src/users/inbox/inbox.service';
import { RequestDelegationService } from 'src/users/request-delegation/request-delegation.service';
import { UserService } from 'src/users/users.service';
import { TimeOffBalanceService } from '../time-off-balance/time-off-balance.service';
import { TimeOffTypePolicySettingService } from '../time-off-type-policy-setting/time-off-type-policy-setting.service';
import { TimeOffTypePolicyService } from '../time-off-type-policy/time-off-type-policy.service';
import { requestTimeOffDto } from './dto';
import { RequestTimeOff } from './request-time-off.model';

@Injectable()
export class RequestTimeOffService {
    constructor(
        @InjectModel('RequestTimeOff')private readonly requestTimeOffModel: Model<RequestTimeOff>,
        private timeOffTypePolicyService:TimeOffTypePolicyService,
        private timeOffPolicySettingService: TimeOffTypePolicySettingService,
        private timeOffBalanceService: TimeOffBalanceService,
        private userService: UserService,
        private requestDelegationService: RequestDelegationService,
        private inboxService:InboxService){}
    
    //request hanya untuk usernya sendiri yang melakukan request
    async createRequestTimeOff(user:any, requestTimeOff:requestTimeOffDto){
        let i = instanceToPlain(requestTimeOff)
    
        //validasi

            //delegate dan delegateTo
        if((i.delegate && !i.delegateTo)|| (!i.delegate && i.delegateTo)){
            throw new ForbiddenException("request time off with delegate true must have delegateTo and if delegate false then delegateTo must be empty")
        }

            //check if time off policy exist
        await this.timeOffTypePolicyService.findOneTimeOffTypePolicy(user, i.timeOffTypePolicy)

        
        //check timeOffPolicySetting
        const timeOffPolicySetting = await this.timeOffPolicySettingService.findOneTimeOffTypePolicySetting(i.timeOffTypePolicy)
        //check time off balance
        const timeOffBalance = await this.timeOffBalanceService.findOneTimeOffBalanceByTimeOffPolicy(i.timeOffTypePolicy, user)

        //set date
        var startDate = dayjs(i.startDate)
        var endDate = dayjs(i.endDate)
        var timeOffDay = (startDate.diff(endDate, "d")-1)
        if(endDate.diff(startDate,"d")<0){
            throw new ForbiddenException("request time off end date must be after start date")
        }

        if(timeOffDay == 0){
            timeOffDay = -1
        }

        // !!! get holiday in company
        const holiday = []

            //check apakah tidak include day off
        if(!timeOffPolicySetting.includeDayOff){
           holiday.map((i)=>{
                var eventDate = dayjs(i.eventDate)
                if((eventDate.isAfter(startDate) && eventDate.isBefore(endDate))&& eventDate.day() != 0){
                    timeOffDay+=1
                }
           })
           for (let index = 0; index <= (timeOffDay*-1); index++) {
            var tempDay = startDate.add(index,'day')
            if(tempDay.day() == 0){
                timeOffDay+=1
            }
           }

        }
            // !!! untuk validasi startDate masih tunggu ditanyaiin dulu
        // if(startDate.isAfter(endDate)){
        //     throw new ForbiddenException("start date must be after end date")
        // }

            //cek apakah time off dishow jika tidak, maka tidak dapat melakukan request
        if(!timeOffPolicySetting.show){
            throw new ForbiddenException("the time off is not supposed to be shown according to the time off setting")
        }
            //check attachment mandatory
        if(timeOffPolicySetting.attachmentMandatory && !i.attachment){
            throw new ForbiddenException("attachment is mandatory for this time off policy")
        }

        //half day
        if(i.timeOfftype == timeOffTypes.halfDay){
            //check bisa half day atau tidak
            if(!timeOffPolicySetting.allowHalfDay ){
                throw new ForbiddenException("this time off doesn't allowa half day request" )
            }

            // halfDayType jika null akan error karena tipe time off half day
            if(!i.halfDayType){
                throw new ForbiddenException("time off with the type half day must have half day types")
            }
            // if(!timeOffPolicySetting.setScheduleHalfDay && (i.scheduledIn || i.scheduledOut)){
            //     throw new ForbiddenException("this time off doesnt allow setSchedule for half day time off")
            // }

            // if(i.halfDayType && (timeOffPolicySetting.setScheduleHalfDay) && (!i.scheduledIn||!i.scheduledOut)){
            //     throw new ForbiddenException("scheduled in and scheduled out must be input for this time off with time off type half day")
            // }

            // if(i.scheduledIn && i.scheduledOut){
            //     var scheduledIn = dayjs(i.scheduledIn)
            //     var scheduledOut = dayjs(i.scheduledOut)
            //     if(scheduledOut.isBefore(scheduledIn)){
            //         throw new ForbiddenException("scheduled in should be before scheduled out")
            //     }
            //     if(scheduledOut.diff(scheduledIn,'hour') != 4  ){
            //         throw new ForbiddenException("time off of half day type scheduled should have at least 4 hour of work time")
            //     }
            // }
            if(i.endDate){
                throw new ForbiddenException("time off type half day shouldn't have end date")
            }

            timeOffDay = -0.5
        }
            //ketika full day
        if(i.timeOfftype == timeOffTypes.fullDay && (i.halfDayType
            // || i.scheduledIn || i.scheduledOut
            )){
            throw new ForbiddenException("Request Time off type of full day should'nt have halfDayType, scheduledIn and scheduledOut")
        }
            //tidak melebihi maxRequest
        if((timeOffDay*-1) > timeOffPolicySetting.maxRequest){
            throw new ForbiddenException("Time off requested day exceeded the day limit per request, the limit of this time off policy is "+timeOffPolicySetting.maxRequest+" days" )
        }


            //allow minus
        if(timeOffPolicySetting.allowMinus && timeOffBalance.activeBalance < timeOffDay*-1){
            if((timeOffPolicySetting.minusAmount) < (timeOffBalance.activeBalance + timeOffDay)*-1){
                throw new ForbiddenException("you have exceeded your time off balance available loan of "+ timeOffPolicySetting.minusAmount + " while you currently have balance of "+timeOffBalance.activeBalance+" and you request time off for "+timeOffDay*-1+" day")
            }
        }
            //not allow minus
            //check balance enough or not
        if(!timeOffPolicySetting.allowMinus && timeOffBalance.activeBalance < timeOffDay*-1){
            throw new ForbiddenException("not enough balance to request time off, current active balance is "+ timeOffBalance.activeBalance+" and the requested amount of day is "+timeOffDay*-1)
        }
        //pengisian request
        i.status = requestStatuses.pending
        i.taken = false
        i.user = user.sub
        i.createdBy = user.sub

        const tempUser = await this.userService.findUserById(user)
        if(!tempUser.approvalLine){
            throw new ForbiddenException("ineligable user to request")
        }
        i.sendTo = tempUser.approvalLine
        
        //kalau delegate dibuat request delegatenya
        //request delegate dilakukan setelah request time off diapprove
        // if(i.delegate){
        //     const requestDelegation= await this.requestDelegationService.requestDelegationFromTimeOff(user,i)
        // }

        //create request time off
        const result = await this.requestTimeOffModel.create(i)
        
        //send notification inbox
            //mail for inbox
        const mail = {mail: result._id, mailType:mailTypes.requestTimeOff}
        
        const inboxRequestTimeOff = await this.inboxService.sendToUserInbox(user,i.sendTo,mail)
        
        return result

    } 

    async uploadAttachment(id:any,filePath:string){
        var newFilePath = filePath.replace("upload-file","")
        const updateRequestTimeOff = await this.requestTimeOffModel.updateOne({_id:id}, {$set:{attachment: newFilePath}})
        return updateRequestTimeOff
    }

    async findRequestTimeOffById(id:any, local:any){
        const requestTimeOff = await this.requestTimeOffModel.findById(id)
        if(!requestTimeOff){
            throw new NotFoundException("no request time off found with the id: "+ id)
        }
        let result= requestTimeOff.toObject()
        result.createdAt = result.createdAt.toLocaleString() 
        result.startDate = result.startDate.toLocaleString()
        if(requestTimeOff.endDate){
            result.endDate = result.endDate.toLocaleString()
        }
        if(requestTimeOff.attachment){
            result.attachment = "http://"+local+result.attachment
        }
        return result
    }

    async findUserAllRequestTimeOff(user:any, local:any){
        const requestTimeOffs = await this.requestTimeOffModel.find({user:user.sub})
        if(requestTimeOffs.length <= 0){
            throw new NotFoundException("no request time off found for user ")
        }
        let results = requestTimeOffs.map((i)=>{
           return i.toObject() 
        }) 

        results.map((i)=>{
            i.createdAt = i.createdAt.toLocaleString() 
            i.startDate = i.startDate.toLocaleString()
            if(i.endDate){
                i.endDate = i.endDate.toLocaleString()
            }
            if(i.attachment){
                i.attachment = "http://"+local+i.attachment
            }
        })

        return results
    }

    async approveRequestTimeOff(){
        
    }
}
