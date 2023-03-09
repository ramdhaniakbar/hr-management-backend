import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { AbsenceSettingService } from './absence-setting.service';
import { absenceSettingDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('absence-setting')
export class AbsenceSettingController {

    constructor(private absenceSettingService: AbsenceSettingService){}

    @Post()
    async createAbsenceSetting(@UserDoc() user: any ,@Res() res:Response, @Body() absenceSetting:absenceSettingDto){
        const result = await this.absenceSettingService.createAbsenceSetting(user, absenceSetting)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    // @Delete()
    // async deleteAbsenceSetting(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Absence Setting'
    //     })
    // }

    // @Get(":id")
    // async getAbsenceSetting(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Get One Absence Setting'
    //     })
    // }

    @Get()
    async getAllAbsenceSetting(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.absenceSettingService.findAbsenceSetting(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Patch()
    async editAbsenceSetting(@UserDoc() user: any ,@Res() res:Response, @Body() edit:absenceSettingDto){
        const result = await this.absenceSettingService.editAbsenceSetting(user, edit)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }
}
