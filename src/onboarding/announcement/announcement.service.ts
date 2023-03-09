import { Injectable, ForbiddenException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { mailTypes } from 'src/enum';
import { InboxService } from 'src/users/inbox/inbox.service';
import { Announcement } from './announcement.model';
import { AnnouncementDto } from './dto';

@Injectable()
export class AnnouncementService {
    constructor(
        @InjectModel('Announcement') private readonly announcementModel: Model<Announcement>,
        private companyService: CompanyService,
        @Inject(forwardRef(()=>InboxService))
        private inboxService: InboxService
    ){}

    async createAnnouncement(announcementDto:AnnouncementDto, user: any){
        const array = announcementDto.sendTo
        if(array != undefined){

            for (let index = 0; index < array.length; index++) {
                if( await this.companyService.findOneOrg(array[index].organization) == null){
                    throw new NotFoundException("failed to find organization id of " + array[index].organization)
                }
    
                let duplicate = array.filter(t => t.organization === array[index].organization)
                if(duplicate.length > 1){
                    throw new ForbiddenException("found duplicate id of " + array[index].organization)
                }
            }
        }

        const result  = await this.announcementModel.create(
            {
                company: user.company, 
                sendTo: announcementDto.sendTo || null, 
                subject: announcementDto.subject,
                content: announcementDto.content,
                attachment: announcementDto.attachment,
                sendEmailNotification: announcementDto.sendEmailNotification,
                createdBy: user.sub
            }
        )
    
        // await this.inboxService.createInbox(user, {mail: result._id, mailType: mailTypes.announcement})
        await this.inboxService.sendAnnouncement(result.sendTo, {mail: result._id, mailType: mailTypes.announcement}, user)
        return result
    }

    async deleteAnnouncement(user:any, id:any){
        await this.findOneAnnouncement(id, user)
        const deletedAnnouncement = await this.announcementModel.deleteOne({_id: id})
        return deletedAnnouncement
    }

    async findOneAnnouncement(id:any, user:any){
        const announcement = await this.announcementModel.findById(id)


        if(!announcement){
            throw new NotFoundException("there is no announcement with the id "+ id)
        }
        let result = {
            _id: announcement._id,
            company: announcement.company,
            sendTo: announcement.sendTo,
            subject: announcement.subject,
            content: announcement.content,
            attachment: announcement.attachment || null,
            sendEmailNotification: announcement.sendEmailNotification,
            createdAt: announcement.createdAt.toLocaleString(),
            createdBy: announcement.createdBy
        }
        
        if(announcement.sendTo == null){
            return result
        }else{
            if(announcement.sendTo.find(i => i.organization == user.organization) == null && announcement.createdBy+"" != user.sub){
                throw new ForbiddenException("you were not sent this announcement nor is the creator of this announcement")
            }
            return result
        }
    }

    //belum ditest dengan user yang berbeda
    async findAllAnnouncement(user:any){
        const announcement = await this.announcementModel.find({$or:[{createdBy : user.sub}, {"sendTo.organization": user.organization}]})
        if(announcement.length == 0){
            throw new NotFoundException("no announcement found")
        }
        let result = []
        announcement.map((i)=>{
            result.push({
                _id: i._id,
                company: i.company,
                sendTo: i.sendTo,
                subject: i.subject,
                content: i.content,
                attachment: i.attachment || null,
                sendEmailNotification: i.sendEmailNotification,
                createdAt: i.createdAt.toLocaleString(),
                createdBy: i.createdBy
            })
        })

        return result
    }

    async editAnnouncement(user: any, id: any, editDto: AnnouncementDto){
        await this.findOneAnnouncement(id, user)
        const editedAnnouncement = await this.announcementModel.updateOne({_id: id}, editDto)
        return editedAnnouncement
    }
}
