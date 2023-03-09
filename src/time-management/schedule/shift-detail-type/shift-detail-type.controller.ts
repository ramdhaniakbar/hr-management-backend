import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { shiftDetailTypeDto } from './dto';
import { ShiftDetailTypeService } from './shift-detail-type.service';

@UseGuards(JwtAuthGuard)
@Controller('shift-detail-type')
export class ShiftDetailTypeController {
    constructor(
        private shiftDetailTypeService: ShiftDetailTypeService){}
    @Post()
    async createShiftDetailType(@UserDoc() user: any ,@Res() res:Response, @Body() shiftDetailType:shiftDetailTypeDto){
        const result = await this.shiftDetailTypeService.createShiftDetailType(user, shiftDetailType)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Delete(":id")
    async deleteShiftDetailType(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.shiftDetailTypeService.deleteOneShiftDetailType(user,id)
        return res.status(HttpStatus.OK).json({
            message: result
        })
    }

    @Get(":id")
    async getShiftDetailType(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result  = await this.shiftDetailTypeService.findOneShiftDetailType(user, id)

        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    @Get()
    async getAllShiftDetailType(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.shiftDetailTypeService.findAllShiftDetailType(user)
        return res.status(HttpStatus.OK).json({
            message:result
        })
    }

    // @Patch()
    // async editShiftDetailType(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Patch Shift Detail Type'
    //     })
    // }

}
