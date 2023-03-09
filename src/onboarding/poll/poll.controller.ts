import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { commentDto, pollDto, pollOptionDto, voteDto } from './dto';
import { PollService } from './poll.service';

@UseGuards(JwtAuthGuard)
@Controller('poll')
export class PollController {
    constructor(
        private pollService: PollService
    ){}

    @Post()
    async createPoll(@UserDoc() user: any ,@Res() res:Response, @Body() poll:pollDto){
        
        const result = await this.pollService.createPoll(user, poll)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Delete(":id")
    async deletePoll(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id:any){
        const result = await this.pollService.deleteOne(user, id)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Get(":id")
    async getOnePoll(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.pollService.findOne(user, id) 
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Get()
    async getAllPoll(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.pollService.findAllPoll(user)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Patch()
    async editPoll(@UserDoc() user: any ,@Res() res:Response, @Body() edit:voteDto){
        const result = await this.pollService.createVote(user, edit)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Put()
    async addPollOption(@UserDoc() user: any ,@Res() res:Response, @Body() pollOption: pollOptionDto){
        const result = await this.pollService.createPollOption(user, pollOption)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Put("comment")
    async addComment(@UserDoc() user: any ,@Res() res:Response, @Body() comment:commentDto){
        const result = await this.pollService.createComment(user, comment)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

}
