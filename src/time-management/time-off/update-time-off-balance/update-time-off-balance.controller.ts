import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('update-time-off-balance')
export class UpdateTimeOffBalanceController {

    @Post()
    async createUpdateTimeOffBalance(@UserDoc() user: any ,@Res() res:Response, @Body() updateTimeOffBalance:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Update TimeOff Balance'
        })
    }

    // @Delete()
    // async deleteUpdateTimeOffBalance(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Update TimeOff Balance'
    //     })
    // }

    @Get(":id")
    async getUpdateTimeOffBalance(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get One Update TimeOff Balance'
        })
    }

    @Get()
    async getAllUpdateTimeOffBalance(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Update TimeOff Balance'
        })
    }

    @Patch()
    async editUpdateTimeOffBalance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Update TimeOff Balance'
        })
    }

}
