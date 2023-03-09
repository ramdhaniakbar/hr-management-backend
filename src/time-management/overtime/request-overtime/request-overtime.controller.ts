import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('request-overtime')
export class RequestOvertimeController {

    @Post()
    async createRequestOvertime(@UserDoc() user: any ,@Res() res:Response, @Body() requestOvertime:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Request Overtime'
        })
    }

    // @Delete()
    // async deleteRequestOvertime(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Request Overtime'
    //     })
    // }

    @Get(":id")
    async getRequestOvertime(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get One Request Overtime'
        })
    }

    @Get()
    async getAllRequestOvertime(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Request Overtime in company'
        })
    }

    @Patch()
    async editRequestOvertime(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Request Overtime'
        })
    }
}
