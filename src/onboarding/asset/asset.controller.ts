import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('asset')
export class AssetController {

    @Post()
    async createAsset(@UserDoc() user: any ,@Res() res:Response, @Body() asset:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Asset'
        })
    }

    @Delete()
    async deleteAsset(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete Asset'
        })
    }

    @Get(":id")
    async getAsset(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Asset'
        })
    }

    @Get()
    async getAllAsset(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Asset in company'
        })
    }

    @Patch()
    async editAsset(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Asset'
        })
    }
}
