import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('change-employee-status')
export class ChangeEmployeeStatusController {
    
    @Post()
    async createChangeEmployeeStatus(@UserDoc() user: any ,@Res() res:Response, @Body() changeEmployeeStatus:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Change Employee Status'
        })
    }

    // @Delete()
    // async deleteChangeEmployeeStatus(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Change Employee Status'
    //     })
    // }

    @Get(":id")
    async getChangeEmployeeStatus(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Change Employee Status'
        })
    }

    @Get()
    async getAllChangeEmployeeStatus(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Change Employee Status in company'
        })
    }

    @Patch()
    async editChangeEmployeeStatus(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Change Employee Status'
        })
    }
}
