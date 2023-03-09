import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { simulateTimeOffBalanceDto } from './dto';
import { TimeOffBalanceService } from './time-off-balance.service';

@UseGuards(JwtAuthGuard)
@Controller('time-off-balance')
export class TimeOffBalanceController {
    constructor(
        private timeOffBalanceService:TimeOffBalanceService
    ){}

    @Post("simulate-time-off-balance")
    async simulateTimeOffBalance(@UserDoc() user: any ,@Res() res:Response, @Body() simulationData:simulateTimeOffBalanceDto){
        const result = await this.timeOffBalanceService.simulateTimeOffBalance(user,simulationData)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    // @Delete()
    // async deleteTimeOffBalance(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete TimeOff Balance'
    //     })
    // }

    @Get(":id")
    async getTimeOffBalance(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        const result = await this.timeOffBalanceService
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get()
    async getUserTimeOffBalance(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.timeOffBalanceService.findUserTimeOffBalances(user)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    // @Patch()
    // async editTimeOffBalance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Patch TimeOff Balance'
    //     })
    // }

}
