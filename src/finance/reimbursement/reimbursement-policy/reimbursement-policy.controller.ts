import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('reimbursement-policy')
export class ReimbursementPolicyController {

    @Post()
    async createReimbursementPolicy(@UserDoc() user: any ,@Res() res:Response, @Body() reimbursementPolicy:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post reimbursement policy'
        })
    }

    @Delete()
    async deleteReimbursementPolicy(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'delete reimbursement policy'
        })
    }

    @Get(":id")
    async getReimbursementPolicy(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get one reimbursement policy'
        })
    }

    @Get()
    async getAllReimbursementPolicy(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get reimbursement policy'
        })
    }

    @Patch()
    async editReimbursementPolicy(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch reimbursement policy'
        })
    }

}
