import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
        
    @Post()
    async createAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() attendance:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Attendance'
        })
    }

    @Put()
    async updateAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() attendance:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Attendance '
        })
    }

    @Delete()
    async deleteAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete Attendance '
        })
    }

    @Get(":id")
    async getAttendance(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get One Attendance'
        })
    }

    @Get()
    async getAllAttendance(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Attendance in company'
        })
    }

    @Patch()
    async editAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Attendance'
        })
    }

    @Patch('checkin')
    async editCheckInAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Check-in Attendance'
        })
    }

    @Patch('checkout')
    async editCheckOutAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Check-out Attendance'
        })
    }

    @Patch('breakin')
    async editbreakInAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch break-in Attendance'
        })
    }

    @Patch('breakout')
    async editbreakOutAttendance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch break out Attendance'
        })
    }

}
