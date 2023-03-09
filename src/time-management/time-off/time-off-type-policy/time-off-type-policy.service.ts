import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { timeOffPolicyTypes } from 'src/enum';
import { timeOffTypePolicyDto } from './dto';
import { TimeOffTypePolicy } from './time-off-type-policy.model';
import {instanceToPlain} from "class-transformer";
import { TimeOffTypePolicySettingService } from '../time-off-type-policy-setting/time-off-type-policy-setting.service';

@Injectable()
export class TimeOffTypePolicyService {
    constructor(
        @InjectModel('TimeOffTypePolicy')private readonly timeOffTypePolicyModel: Model<TimeOffTypePolicy>,
        private readonly companyService: CompanyService,
        private readonly timeOffTypePolicySettingService: TimeOffTypePolicySettingService){}

    async createTimeOffTypePolicy(user:any, timeOffTypePolicy: timeOffTypePolicyDto){
        const i = timeOffTypePolicy

        //defaultForNewEmployee
        if(i.defaultForNewEmployee == false){
            if(i.allNewEmployee != null || i.filter != null){
                throw new ForbiddenException("all new employee and filter should be null when default for new employee is false")
            }
        }else if(i.defaultForNewEmployee == true){
            if(i.allNewEmployee == null){
                throw new ForbiddenException("default for new employee's all new employee can't be null")
            }
            else if((i.allNewEmployee == true && i.filter != null) || (i.allNewEmployee == false && i.filter == null)){
                throw new ForbiddenException("chose between filter or all new employee")
            }
        }

        // unlimited balance
        if(i.unlimitedBalances == true){
            if( i.policyType != null || i.balanceGenerated !=null || i.months != null || i.policyDate != null  || i.anniversary != null || i.noExpiryDate != null || i.rounding != null || i.firstEmerge != null || i.joinedDayRounding != null ||  i.anniversary != null || i.emergeDay != null || i.annualDate != null){
                throw new ForbiddenException("policyType of with unlimited balance shouldn't have policy type, balanceGenerated, months, policyDate, anniversary, noExpiryDate, rounding, first emerge, joinedDayRounding, anniversary, emergeDay, rounding, and annualDate")
            }
        }

        // not unlimited balance
        else if(i.unlimitedBalances == false){

            //anniversary
            if(i.policyType == timeOffPolicyTypes.anniversary){
                if(i.rounding != null || i.firstEmerge != null || i.prorateOnFirstEmerge != null ||  i.joinedDayRounding != null ||  i.anniversary != null || i.emergeDay != null || i.annualDate != null){
                    throw new ForbiddenException("policyType of anniversary shouldn't have first emerge, prorateOnFirstEmerge, joinedDayRounding, anniversary, emergeDay, rounding, and annualDate")
                }
                else if([i.noExpiryDate == true, i.months != null, i.policyDate != null].filter(Boolean).length != 1){
                    throw new ForbiddenException("you should only pick one type of the expiry date ")
                }
            } 

            //monthly
            else if(i.policyType == timeOffPolicyTypes.monthly ){
                
                if((i.emergeDay == null || i.firstEmerge == null || i.joinedDayRounding == null || i.anniversary == null) || ( i.rounding != null || i.annualDate != null || i.prorateOnFirstEmerge != null)){
                    throw new ForbiddenException("policyType of monthly should not have rounding, annualDate,prorateOnFirstEmerge and also should have first emerge,emergeDay, joinedDayRounding, anniversary")
                }else if([i.noExpiryDate == true, i.months != null, i.policyDate != null, i.anniversary == true].filter(Boolean).length != 1){
                    throw new ForbiddenException("you should only pick one type of the expiry date ")
                }
            }

            //annually
            else if(i.policyType == timeOffPolicyTypes.annually){
                if((i.annualDate == null || i.firstEmerge == null ||  i.joinedDayRounding == null  || i.prorateOnFirstEmerge == null || i.rounding == null) || (i.anniversary != null ||i.emergeDay != null)){
                    throw new ForbiddenException("policyType of annually should not have anniversary and emergeDay but should have rounding, annualDate, first emerge, joinedDayRounding, prorateOnFirstEmerge")
                }
                else if([i.noExpiryDate == true, i.months != null, i.policyDate != null].filter(Boolean).length != 1){
                    throw new ForbiddenException("you should only pick one type of the expiry date ")
                }
            }

            //general
            if(i.balanceGenerated == null){
                throw new ForbiddenException("balance generated should not be empty or it should be unlimited balance")
            }else if( i.noExpiryDate == null){
                throw new ForbiddenException("no expiry date should be either true or false")
            }else if(i.firstEmerge == true){
                if(i.effectiveFromJoinDate == null ){
                    throw new ForbiddenException("with first emerge effectiveFromJoinDate should exist ")
                }else if((i.emergeAfter == null && i.firstEmergeStatus == null) || (i.emergeAfter != null && i.firstEmergeStatus != null)){
                    throw new ForbiddenException("you should pick one of the emerge method ")
                }
            }else if(i.firstEmerge == false || i.firstEmerge == null){
                if(i.effectiveFromJoinDate!= null || i.prorateOnFirstEmerge != null || i.emergeAfter != null || i.firstEmergeStatus != null){
                    throw new ForbiddenException(" there should not be effectiveFromJoinDate, prorateOnFirstEmerge, emergeAfter, firstEmergeStatus when first emerge is false or don't exist")
                }
            }else if(i.emergeDay != null){
                if((i.emergeDay.anniversary != true && i.emergeDay.customDays != null) || (i.emergeDay.anniversary == false && i.emergeDay.customDays == null)){
                    throw new ForbiddenException(" you should choose one of the emergeDay")
                }
            }
        }

        //validate filter organization and job level
        if(i.filter != null){
            const arrOrganization = i.filter.organization
            await this.companyService.findArrOrg(arrOrganization)

            const arrJobLevel = i.filter.jobLevel
            await this.companyService.findArrJobLevel(arrJobLevel)
        }
        //validate employment status
        if(i.firstEmergeStatus != null){
            const arrEmpStatus = i.firstEmergeStatus
            await this.companyService.findArrEmploymentStatus(arrEmpStatus)
        }
        
        let createTimeOffTypePolicy = instanceToPlain(i)
        createTimeOffTypePolicy.company = user.company
        createTimeOffTypePolicy.createdBy = user.sub

        const result = await this.timeOffTypePolicyModel.create(createTimeOffTypePolicy)
        const defaultTimeOffPolicySetting = await this.timeOffTypePolicySettingService.createTimeOffTypePolicySetting(user, result)
        console.log(defaultTimeOffPolicySetting)
        return result
    }

    async findAllTimeOffTypePolicies(user:any){
        const timeOffTypePolicies = await this.timeOffTypePolicyModel.find({company: user.company})
        
        if(timeOffTypePolicies.length == 0){
            throw new NotFoundException("no time off type policy found with the your company id ")
        }
        let result = timeOffTypePolicies.map((i)=>{
            return i.toObject()
        })
        result.map((i)=>{
            i.effectiveAsOf = i.effectiveAsOf.toLocaleString()
            if(i.annualDate){
                i.annualDate =  i.annualDate.toLocaleString() 
            }
            i.createdAt = i.createdAt.toLocaleString()
        })

        return result
    }

    async findOneTimeOffTypePolicy(user:any, id:any){
        const timeOffTypePolicy = await this.timeOffTypePolicyModel.findById(id)
        if(!timeOffTypePolicy){
            throw new NotFoundException("no time off type policy found with the id: "+id)
        }
        let result = timeOffTypePolicy.toObject()
        result.effectiveAsOf = timeOffTypePolicy.effectiveAsOf.toLocaleString()
        if(timeOffTypePolicy.annualDate){
            result.annualDate =  timeOffTypePolicy.annualDate.toLocaleString()
        }
        result.createdAt = timeOffTypePolicy.createdAt.toLocaleString()

        return result
    }

    async deleteOneTimeOffTypePolicy(user:any, id:any){
        await this.findOneTimeOffTypePolicy(user, id)
        const deletedTimeOffTypePolicy = await this.timeOffTypePolicyModel.deleteOne({_id: id})
        return deletedTimeOffTypePolicy
    }

    async editOneTimeOffTypePolicy(user:any, edit:any){

    }

    async filterTimeOffTypePolicy(createdUser:any){
        const timeOffTypePolicies = await this.timeOffTypePolicyModel.find(
            {$and:[
                {company:createdUser.company},
                {effectiveAsOf:{$lte:Date.now()}}, 
                {$or:[
                    {allNewEmployee:true},
                    {$and:[
                        {"filter.organization.organization":{"$in":createdUser.organization}},
                        {"filter.jobLevel.jobLevel":{"$in":createdUser.jobLevel}}
                    ]},
                ]}
            ]}
        )

        // !!! belum ditest harus ditest dengan membuat time off policy setting yang setDefault true di time off policy yang defaultForNewEmployee yang false kemudian menambahkan employee baru untuk melihat apa employeenya digenerate time off balance untuk time off policy tersebut
        // Menemukan time off policy yang memiliki time off policy setting setDefault
        let result = timeOffTypePolicies.map((i)=>{
            return i.toObject
        })
        const findTimeOffSetDefault = await this.timeOffTypePolicySettingService.findTimeOffSettingSetDefault(createdUser)
        findTimeOffSetDefault.map((i)=>{
            
        })
        return timeOffTypePolicies
    }
}
