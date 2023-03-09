import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('request-reimbursement')
export class RequestReimbursementController {

    @Post()
    async createRequestReimbursement(@UserDoc() user: any ,@Res() res:Response, @Body() requestReimbursement:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post request reimbursement'
        })
    }

    // @Delete()
    // async deleteRequestReimbursement(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'delete request reimbursement'
    //     })
    // }

    @Get(":id")
    async getRequestReimbursement(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get one request reimbursement'
        })
    }

    @Get()
    async getAllRequestReimbursement(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get request reimbursement'
        })
    }

    @Patch()
    async editRequestReimbursement(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch request reimbursement'
        })
    }


}
