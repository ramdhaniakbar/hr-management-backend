import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { attendanceMachineSettingDto } from './dto';
import { AttendanceMachineSettingService } from './attendance-machine-setting.service';

@UseGuards(JwtAuthGuard)
@Controller('attendance-machine-setting')
export class AttendanceMachineSettingController {
    constructor(
        private attendanceMachineSettingService: AttendanceMachineSettingService
    ){}

    @Post()
    async createattendaceMachineSetting(@UserDoc() user: any ,@Res() res:Response, @Body() attendaceMachineSetting: attendanceMachineSettingDto){
        const result = await this.attendanceMachineSettingService.createattendanceMachineSetting(user, attendaceMachineSetting)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Delete(":id")
    async deleteattendanceMachineSetting(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id:any){
        const result = await this.attendanceMachineSettingService.deleteOneattendanceMachineSetting(user, id)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Get(":id")
    async getOneattendanceMachineSetting(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.attendanceMachineSettingService.findOneattendanceMachineSetting(user, id) 
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Get()
    async getAllattendanceMachineSetting(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.attendanceMachineSettingService.findAllattendanceMachineSetting(user)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Patch(":id")
    async updateAttendanceMachineSetting(@UserDoc() user: any ,@Res() res:Response, @Body() edit:attendanceMachineSettingDto,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.attendanceMachineSettingService.updateAttendanceMachineSetting(user,edit,id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

}