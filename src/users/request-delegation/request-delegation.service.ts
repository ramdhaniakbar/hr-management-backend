import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import dayjs from 'dayjs';
import { Model } from 'mongoose';
import { mailTypes, requestStatuses } from 'src/enum';
import { InboxService } from '../inbox/inbox.service';
import { RequestDelegation } from './request-delegation.model';

@Injectable()
export class RequestDelegationService {
    constructor(
        @InjectModel('RequestDelegation') private readonly requestDelegationModel: Model<RequestDelegation>,
        @Inject(forwardRef(()=> InboxService))
        private inboxService:InboxService
    ){}
    async createRequestDelegation(){

    }

    //secara default request delegation dari time off menggunakan semua request type
    async requestDelegationFromTimeOff(user:any, requestTimeOff:any ){
        var requestType = [mailTypes.requestAttendance, mailTypes.requestCashAdvance, mailTypes.requestChangeShift, mailTypes.requestDelegation, mailTypes.requestOvertime, mailTypes.requestReimbursement, mailTypes.requestTimeOff ]
        const requestDelegation = await this.requestDelegationModel.create({company:user.company,delegateFrom: user.sub, delegateTo: requestTimeOff.sendTo, startDate: requestTimeOff.startDate, endDate:requestTimeOff.endDate, notes: "Cuti", requestType:requestType,status: requestStatuses.pending, createdBy: user.sub})

        //send to user's inbox that the request is sent to 
        const mail = {mail:requestDelegation._id, mailType: mailTypes.requestDelegation}
        await this.inboxService.sendToUserInbox(user, requestTimeOff.sendTo,mail)

        return requestDelegation
    }

    async findUserOnDeleation(userId:any, mailType:any){
        var dateNow = Date.now()
        const userOnDelegation = await this.requestDelegationModel.findOne({delegateFrom:userId, startDate:{$lte:dateNow}, endDate:{$gte:dateNow},requestType:mailType})

        return userOnDelegation
    }
}
