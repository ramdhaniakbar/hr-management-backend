import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('borrow-asset')
export class BorrowAssetController {

    @Post()
    async createBorrowAsset(@UserDoc() user: any ,@Res() res:Response, @Body() borrowAsset:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Borrow Asset'
        })
    }

    @Delete()
    async deleteBorrowAsset(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete Borrow Asset'
        })
    }

    @Get(":id")
    async getBorrowAsset(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Borrow Asset'
        })
    }

    @Get()
    async getAllBorrowAsset(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Borrow Asset in company'
        })
    }

    @Patch()
    async editBorrowAsset(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Borrow Asset'
        })
    }
}
