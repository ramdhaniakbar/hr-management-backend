import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('request-cash-advance')
export class RequestCashAdvanceController {

    @Post()
    async createRequestCashAdvance(@UserDoc() user: any ,@Res() res:Response, @Body() requestCashAdvance:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post request cash advance'
        })
    }

    // @Delete()
    // async deleteRequestCashAdvance(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'delete request cash advance'
    //     })
    // }

    @Get(":id")
    async getRequestReimbursement(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get one request reimbursement '
        })
    }

    @Get()
    async getAllRequestCashAdvance(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get request cash advance'
        })
    }

    @Patch()
    async editRequestCashAdvance(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch request cash advance'
        })
    }

}
