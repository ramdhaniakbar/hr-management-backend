import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('time-tracker-history')
export class TimeTrackerHistoryController {
            
    @Post()
    async createTimeTrackerHistory(@UserDoc() user: any ,@Res() res:Response, @Body() timeTrackerHistory:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Time Tracker History'
        })
    }

    @Delete()
    async deleteTimeTrackerHistory(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete Time Tracker History'
        })
    }

    @Get(":id")
    async getTimeTrackerHistory(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Time Tracker History'
        })
    }

    @Get()
    async getAllTimeTrackerHistory(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Time Tracker History in company'
        })
    }

    @Patch()
    async editTimeTrackerHistory(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Time Tracker History'
        })
    }
}
