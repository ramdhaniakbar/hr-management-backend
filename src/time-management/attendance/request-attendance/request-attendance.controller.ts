import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('request-attendance')
export class RequestAttendanceController {
        
    @Post()
    async createRequestAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() requestAttendance:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Request Attendance'
        })
    }

    // @Delete()
    // async deleteRequestAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Request Attendance '
    //     })
    // }

    @Get(":id")
    async getRequestAttendance(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get One Request Attendance'
        })
    }

    @Get()
    async getAllRequestAttendance(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Request Attendance'
        })
    }

    @Patch()
    async editRequestAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Request Attendance'
        })
    }
}
