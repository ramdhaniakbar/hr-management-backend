import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('cash-advance-settlement')
export class CashAdvanceSettlementController {

    @Post()
    async createCashAdvanceSettlement(@UserDoc() user: any ,@Res() res:Response, @Body() cashAdvanceSettlement:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post cash advance settlement'
        })
    }

    @Delete()
    async deleteCashAdvanceSettlement(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'delete cash advance settlement'
        })
    }

    @Get()
    async getAllCashAdvanceSettlement(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get cash advance settlement'
        })
    }

    @Patch()
    async editCashAdvanceSettlement(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch cash advance settlement'
        })
    }
}
