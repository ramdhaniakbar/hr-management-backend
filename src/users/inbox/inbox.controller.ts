import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { InboxService } from './inbox.service';

@UseGuards(JwtAuthGuard)
@Controller('inbox')
export class InboxController {
    
    constructor(
        private inboxService: InboxService
        ){}

    // @Post()
    // async createInbox(@UserDoc() user: any ,@Res() res:Response, @Body() inbox:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Post Inbox'
    //     })
    // }

    // @Delete()
    // async deleteInbox(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Inbox'
    //     })
    // }

    @Get(":id")
    async getInbox(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        const result = await this.inboxService.openMail(user,id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get()
    async getAllInbox(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.inboxService.findUserInbox(user)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    // @Patch()
    // async editInbox(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Patch Inbox'
    //     })
    // }
}
