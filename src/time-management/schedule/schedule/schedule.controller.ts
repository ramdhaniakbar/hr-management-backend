import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { scheduleDto } from './dto';
import { ScheduleService } from './schedule.service';

@UseGuards(JwtAuthGuard)
@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleService: ScheduleService){}

    @Post()
    async createSchedule(@UserDoc() user: any ,@Res() res:Response, @Body() schedule:scheduleDto){
        const result = await this.scheduleService.createSchedule(user, schedule)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Delete(":id")
    async deleteSchedule(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.scheduleService.deleteOneSchedule(user,id)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Get(":id")
    async getSchedule(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.scheduleService.findOneSchedule(user, id)
        return res.status(HttpStatus.OK).json({
            message: result
        })
        
    }

    @Get()
    async getAllSchedule(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.scheduleService.findAllSchedule(user)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Patch()
    async editSchedule(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Schedule'
        })
    }
}
