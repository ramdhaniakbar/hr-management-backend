import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('request-change-shift')
export class RequestChangeShiftController {

    @Post()
    async createRequestChangeShift(@UserDoc() user: any ,@Res() res:Response, @Body() requestChangeShift:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Request Change Shift'
        })
    }

    // @Delete()
    // async deleteRequestChangeShift(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Request Change Shift'
    //     })
    // }

    @Get(":id")
    async getRequestChangeShift(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get One Request Change Shift'
        })
    }

    @Get()
    async getAllRequestChangeShift(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Request Change Shift in company'
        })
    }

    @Patch()
    async editRequestChangeShift(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Request Change Shift'
        })
    }

}
