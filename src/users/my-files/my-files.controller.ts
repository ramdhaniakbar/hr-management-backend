import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('my-files')
export class MyFilesController {
        
    @Post()
    async createMyFiles(@UserDoc() user: any ,@Res() res:Response, @Body() myFiles:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post My Files'
        })
    }

    @Delete()
    async deleteMyFiles(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete My Files'
        })
    }

    @Get(":id")
    async getMyFiles(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get My Files'
        })
    }

    @Get()
    async getAllMyFiles(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All My Files in company'
        })
    }

    @Patch()
    async editMyFiles(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch My Files'
        })
    }
}
