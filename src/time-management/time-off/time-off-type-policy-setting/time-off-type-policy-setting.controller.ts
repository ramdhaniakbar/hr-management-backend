import { Body, Controller, Get, HttpStatus, Patch, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { updateTimeOffTypeSettingDto } from './dto';
import { TimeOffTypePolicySettingService } from './time-off-type-policy-setting.service';

@UseGuards(JwtAuthGuard)
@Controller('time-off-type-policy-setting')
export class TimeOffTypePolicySettingController {
    constructor(private timeOffTypePolicySettingService:TimeOffTypePolicySettingService){}

    @Get()
    async getAllTimeOffTypePolicySetting(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.timeOffTypePolicySettingService.findAllTimeOffTypePolicySetting(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Patch()
    async editAllTimeOffTypePolicySetting(@UserDoc() user: any ,@Res() res:Response, @Body() edit:updateTimeOffTypeSettingDto){
        const result = await this.timeOffTypePolicySettingService.updateTimeOffTypePolicySetting(edit,user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }
}
