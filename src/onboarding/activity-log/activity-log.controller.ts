import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('activity-log')
export class ActivityLogController {
                
    @Post()
    async createActivityLog(@UserDoc() user: any ,@Res() res:Response, @Body() activityLog:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Activity Log'
        })
    }

    @Delete()
    async deleteActivityLog(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete Activity Log'
        })
    }

    @Get(":id")
    async getActivityLog(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Activity Log'
        })
    }

    @Get()
    async getAllActivityLog(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Activity Log in company'
        })
    }

    @Patch()
    async editActivityLog(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Activity Log'
        })
    }
}
