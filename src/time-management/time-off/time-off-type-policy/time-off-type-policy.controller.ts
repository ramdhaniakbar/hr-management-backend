import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { timeOffTypePolicyDto } from './dto';
import { TimeOffTypePolicyService } from './time-off-type-policy.service';

@UseGuards(JwtAuthGuard)
@Controller('time-off-type-policy')
export class TimeOffTypePolicyController {

    constructor(private readonly timeOffTypePolicyService: TimeOffTypePolicyService){}

    @Post()
    async createTimeOffTypePolicy(@UserDoc() user: any ,@Res() res:Response, @Body() timeOffTypePolicy:timeOffTypePolicyDto){
        const result = await this.timeOffTypePolicyService.createTimeOffTypePolicy(user, timeOffTypePolicy)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Delete(":id")
    async deleteTimeOffTypePolicy(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.timeOffTypePolicyService.deleteOneTimeOffTypePolicy(user, id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get(":id")
    async getTimeOffTypePolicy(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.timeOffTypePolicyService.findOneTimeOffTypePolicy(user, id)
        return res.status(HttpStatus.OK).json({
            result : result
        })
    }

    @Get()
    async getAllTimeOffTypePolicy(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.timeOffTypePolicyService.findAllTimeOffTypePolicies(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Patch()
    async editTimeOffTypePolicy(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch TimeOff Type Policy'
        })
    }

}
