import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('announcement')
export class AnnouncementController {
    constructor(private announcementService: AnnouncementService){}

    @Post()
    async createAnnouncement(@UserDoc() user: any ,@Res() res:Response, @Body() announcement:AnnouncementDto){
        const result = await this.announcementService.createAnnouncement(announcement, user)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Delete(":id")
    async deleteAnnouncement(@UserDoc() user: any ,@Res() res:Response, @Param('id',  new ValidateObjectId())id: any){
        const result = await this.announcementService.deleteAnnouncement(user, id)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Get(":id")
    async getAnnouncement(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        const result = await this.announcementService.findOneAnnouncement(id, user)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Get()
    async getAllAnnouncement(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.announcementService.findAllAnnouncement(user)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Patch(":id")
    async editAnnouncement(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any, @Body() edit:AnnouncementDto){
        const result  = await this.announcementService.editAnnouncement(user,id, edit)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }
}
