import { Injectable, ForbiddenException, Inject,forwardRef, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnnouncementService } from 'src/onboarding/announcement/announcement.service';
import { PollService } from 'src/onboarding/poll/poll.service';
import { RequestDelegationService } from '../request-delegation/request-delegation.service';
import { UserService } from '../users.service';
import { Inbox } from './inbox.model';

@Injectable()
export class InboxService {
    constructor(
        @InjectModel('Inbox') private readonly inboxModel: Model<Inbox>,
        private userService: UserService,
        @Inject(forwardRef(()=> AnnouncementService))
        private announcementService: AnnouncementService,
        // @Inject(forwardRef(()=> PollService))
        private pollService: PollService,
        private requestDelegationService: RequestDelegationService
        ){}

    
    async createInbox(user:any, mail:any){
        const inbox = await this.inboxModel.create({
            company: user.company,
            user: user.sub,
            mail: mail.mail,
            mailType: mail.mailType,
            read: false
        })
        return inbox;
    }
    async sendAnnouncement(sendTo:any, mail:any, user:any){
        const users = await this.userService.findMultiUserById(sendTo)
        const inbox =  await this.inboxModel.insertMany(
            users.map((i)=>{
                const mail1 = {
                    company: user.company,
                    user: i._id,
                    mail: mail.mail,
                    mailType: mail.mailType,
                    read: false
                }
                return mail1
            })
        )
        return inbox;
    }

    async sendToUsers(user:any, users:any, mail:any){
        const inbox = await this.inboxModel.insertMany(
            users.map((i)=>{
                const mail1 = {
                    company: user.company,
                    user: i.user,
                    mail: mail.mail,
                    mailType: mail.mailType,
                    read: false
                }
                return mail1
            })
        )

        return inbox
    }


    async findUserInbox(user:any){
        const inbox =  await this.inboxModel.find({user:user.sub}).populate({path: "mail", populate: {path: "createdBy"}})
        if(inbox.length === 0){
            throw new NotFoundException("no mail found")
        }
        let result =[]
        inbox.map((i)=>{
            result.push(i.toObject())
        })
        
        result.map((i)=>{
            i.mail.createdAt = i.mail.createdAt.toLocaleString()
            console.log(i.mail.createdAt)
            i.mail.createdBy.password = null
            if(i.mailType+"" == "Poll"){
                i.mail.updatedAt = i.mail.updatedAt.toLocaleString()
                i.mail.endDate = i.mail.endDate.toLocaleString()
            }
        })

        // let result = []
        // inbox.map((i)=>{
        //     result.push({
        //         company: i.company,
        //         user: i.user,
        //         mail: {
        //                 _id: 
        //                 company: i.mail.company,
        //                 sendTo: i.sendTo,
        //                 subject: i.subject,
        //                 content: i.content,
        //                 attachment: i.attachment || null,
        //                 sendEmailNotification: i.sendEmailNotification,
        //                 createdAt: i.createdAt.toLocaleString(),
        //                 createdBy: i.createdBy
        //         }
        //     })
        // })


        return result
    }

    async openMail(user:any, id:any){
        const inbox = await this.inboxModel.findById(id)

        if(!inbox){
            throw new NotFoundException("no inbox with the id " + id + " found")
        }
        if(inbox.read == false){
            const read = await this.inboxModel.updateOne({_id: id}, {read: true})
        }
        if(inbox.mailType == "Poll"){
            const poll = await this.pollService.findOne(user,inbox.mail)
            return poll
        }else if(inbox.mailType == "Announcement"){
            const announcement = await this.announcementService.findOneAnnouncement(user,inbox.mail)
        }
        return inbox
    }

    // ketika send request ke inbox user dicek user yang menerima approval requestnya apakah dia sedang ada delegation
    async sendToUserInbox(user:any, sendTo:any, mail:any){
        const inbox = await this.inboxModel.create({
            company: user.company,
            user: sendTo,
            mail: mail.mail,
            mailType: mail.mailType,
            read: false
        })

        const findDelegateUser = await this.requestDelegationService.findUserOnDeleation(sendTo, mail.mailType)
        // !!! mungkin bisa infinite loop
        if(findDelegateUser){
            await this.sendToUserInbox(user, findDelegateUser.delegateTo,mail )
        }
        return inbox;
    }

}
