import { Injectable, ForbiddenException, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mailTypes } from 'src/enum';
import { InboxService } from 'src/users/inbox/inbox.service';
import { AnnouncementService } from '../announcement/announcement.service';
import { commentDto, pollDto, pollOptionDto, voteDto } from './dto';
import { Poll } from './poll.model';

@Injectable()
export class PollService {
    constructor(
        @InjectModel('Poll') private readonly pollModel: Model<Poll>,
        @Inject( forwardRef(()=> AnnouncementService))
        private inboxService: InboxService
    ){}

    async createPoll(user: any, poll: pollDto){
        const createdPoll = await this.pollModel.create({
            company: user.company,
            status: true,
            createdBy: user.sub,
            pollName: poll.pollName,
            pollOption: poll.pollOption,
            endDate: poll.endDate,
            allowToCreateOther: poll.allowToCreateOther,
            participant: poll.participant,
            allowToComment: poll.allowToComment,
            sendNotification: poll.sendNotification
        })
        if(poll.sendNotification){
            await this.inboxService.sendToUsers(user, poll.participant, {mail: createdPoll._id, mailType: mailTypes.poll })
        }
        return createdPoll
    }

    //belum ditest full
    async findAllPoll(user:any){
        const polls = await this.pollModel.find(
            {$or:
                [
                    {createdBy : user.sub}, {"participant.user": user.sub}
                ]
            }
            ).populate("createdBy")
    
        if(polls.length == 0){
            throw new NotFoundException("no poll found")
        }
        let result = []
        polls.map((i)=>{
            result.push({
            _id: i._id,
            company: i.company,
            pollName: i.pollName,
            endDate: i.endDate.toLocaleString(),
            createdAt: i.createdAt.toLocaleString(),
            createdBy: i.createdBy,
            status: i.status,
            })
        })

        return result
    }

    //belum ditest
    async findOne(user:any, id:any){
        const poll = await ( await this.pollModel.findById(id).populate({path:"pollOption.voters.user participant.user comment.createdBy createdBy"}))
        if(!poll){
            throw new NotFoundException("no poll found")
        }
        let result = poll.toObject()

        result.createdBy.password = null
        result.createdAt = poll.createdAt.toLocaleString()
        result.endDate = poll.endDate.toLocaleString()
        
        result.comment.map((i)=>{
            i.createdAt= i.createdAt.toLocaleString()
            i.createdBy.password = null
        })
        
        if(poll.participant == null){
            return result
        }else{
            if(poll.participant.find(i => i.user == user.sub) == null && result.createdBy._id+"" != user.sub){
                throw new ForbiddenException("you were not sent this poll nor is the creator of this poll")
            }
        }
        result.participant.map((i)=>{
            i.user.password = null
        })
        return result
    }

    async deleteOne(user:any, id:any){
        await this.findOne(user, id)
        const deletedPoll = await this.pollModel.deleteOne({_id: id})
        return deletedPoll
    }

    async createComment(user:any, Comment:commentDto){
        const poll = await this.findOne(user, Comment._id)
        if(poll.allowToComment == false){
            throw new ForbiddenException("this poll does not allow comment")
        }
        const result =  await this.pollModel.updateOne({_id: Comment._id},{$push:{comment:{comment: Comment.comment, createdBy: user.sub}}})
        // {$push:{comment:{comment: Comment.comment, createdBy: user.sub}}}
        return result
    }

    async createVote(user: any, vote:voteDto){
        const poll = await this.findOne(user, vote._id)
        const x = poll.pollOption.find((i)=> i._id == vote.pollOption)
        if(!x){
            throw new NotFoundException("there is no option with this poll option id "+ vote.pollOption) 
        }

        let temp = true 
        poll.pollOption.map((pollOption)=>{
            if(pollOption.voters.find((f)=> f.user._id == user.sub)){
                temp = false
            }
        })
        if(temp){
            const result  = await this.pollModel.updateOne(
                {_id:vote._id, "pollOption._id": vote.pollOption}, 
                {$addToSet:{"pollOption.$.voters": {user: user.sub}}}
                )
                return result
        }

        const result  = await this.pollModel.updateOne(
            {_id:vote._id, "pollOption._id": vote.pollOption}, 
            {$pull:{"pollOption.$.voters": {user: user.sub}}}
            )
            return result
        
    }

    async createPollOption(user: any, pollOption:pollOptionDto){
        const poll = await this.findOne(user, pollOption._id)

        if(poll.allowToCreateOther == false){
            throw new ForbiddenException("this poll does not allow to create new poll option")
        }
        poll.pollOption.map((i)=>{
            if(i.pollOptionIndex == pollOption.pollOptionIndex){
                throw new ForbiddenException("the index of number "+pollOption.pollOptionIndex+ " already exist")
            }
        })
        const result = await this.pollModel.updateOne(
            {_id: pollOption._id}, 
            {$push:{pollOption:
                {pollOption: pollOption.pollOption, pollOptionIndex: pollOption.pollOptionIndex}
                }
            }
        )
        return result;

    }
}
