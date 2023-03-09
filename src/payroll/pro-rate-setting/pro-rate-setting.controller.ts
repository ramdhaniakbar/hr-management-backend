import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { prorateSettingDto } from './dto';
import { ProRateSettingService } from './pro-rate-setting.service';

@UseGuards(JwtAuthGuard)
@Controller('pro-rate-setting')
export class ProRateSettingController {

    constructor(private proRateSettingService: ProRateSettingService){}

    @Post()
    async createProRateSetting(@UserDoc() user: any ,@Res() res:Response, @Body() proRateSetting:prorateSettingDto){
        const result = await this.proRateSettingService.createProrateSetring(user,proRateSetting)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    // @Delete()
    // async deleteProRateSetting(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Pro Rate setting'
    //     })
    // }

    // @Get(":id")
    // async getProRateSetting(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Get One Pro Rate setting'
    //     })
    // }

    @Get()
    async getAllProRateSetting(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.proRateSettingService.findProrateSetting(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Patch()
    async editProRateSetting(@UserDoc() user: any ,@Res() res:Response, @Body() edit:prorateSettingDto){
        const result = await this.proRateSettingService.editProrateSetting(user, edit)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }
}
