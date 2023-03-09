import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { BreakTypeService } from './break-type.service';
import { BreakTypeDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('break-type')
export class BreakTypeController {
    constructor(private breakTypeService: BreakTypeService){}

    @Post()
    async createBreakType(@UserDoc() user: any ,@Res() res:Response, @Body() breakType:BreakTypeDto){
        const result = await this.breakTypeService.createBreakType(user, breakType);

        return res.status(HttpStatus.OK).json({
            message:  result
        })
    }

    @Delete(":id")
    async deleteBreakType(@Res() res:Response, @Param('id',  new ValidateObjectId())id: any){
        const result = await this.breakTypeService.deleteBreakType(id)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Get(":id")
    async getBreakType(@UserDoc() user: any ,@Res() res:Response, @Param('id',  new ValidateObjectId())id: any){
        const result = await this.breakTypeService.findOneBreakType(id)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Get()
    async getAllBreakType(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.breakTypeService.getAllBreakType(user)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    // @Patch()
    // async editBreakType(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Patch Break Type'
    //     })
    // }
}
