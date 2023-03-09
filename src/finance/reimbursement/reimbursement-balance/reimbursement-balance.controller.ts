import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('reimbursement-balance')
export class ReimbursementBalanceController{

    // @Post()
    // async createAssignUpdateReimbursement(@UserDoc() user: any ,@Res() res:Response, @Body() assignUpdateReimbursement:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Post assign update reimbursement'
    //     })
    // }

    // @Delete()
    // async deleteAssignUpdateReimbursement(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete assign update reimbursement'
    //     })
    // }

    @Get(":id")
    async getReimbursementBalance(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get one assign update reimbursement'
        })
    }

    // @Get()
    // async getAllAssignUpdateReimbursement(@UserDoc() user: any ,@Res() res:Response){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Get all assign update reimbursement'
    //     })
    // }

    // @Patch()
    // async editAssignUpdateReimbursement(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Patch assign update reimbursement'
    //     })
    // }

}
