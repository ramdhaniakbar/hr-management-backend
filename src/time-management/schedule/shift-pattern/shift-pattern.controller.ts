import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { shiftPatternDto } from './dto';
import { ShiftPatternService } from './shift-pattern.service';

@UseGuards(JwtAuthGuard)
@Controller('shift-pattern')
export class ShiftPatternController {
    constructor(
        private shiftPatternService:ShiftPatternService){}

    @Post()
    async createShiftPattern(@UserDoc() user: any ,@Res() res:Response, @Body() shiftPattern:shiftPatternDto){
        const result = await this.shiftPatternService.createShiftPattern(user, shiftPattern)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Delete(":id")
    async deleteShiftPattern(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.shiftPatternService.deleteOneShiftPattern(user, id)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Get(":id")
    async getShiftPattern(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.shiftPatternService.findOneShiftPattern(user,id)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Get()
    async getAllShiftPattern(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.shiftPatternService.findAllShiftPattern(user)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    // @Patch()
    // async editShiftPattern(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Patch Shift Pattern'
    //     })
    // }
}
