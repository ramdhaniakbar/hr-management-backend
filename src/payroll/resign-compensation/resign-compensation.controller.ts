import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { resignCompensationDto } from './dto';
import { ResignCompensationService } from './resign-compensation.service';

@UseGuards(JwtAuthGuard)
@Controller('resign-compensation')
export class ResignCompensationController {
    constructor(private resignCompensationService: ResignCompensationService){}
            
    @Post()
    async createResignCompensation(@UserDoc() user: any ,@Res() res:Response, @Body() resignCompensation:resignCompensationDto){
        const result = await this.resignCompensationService.createResignCompensation(user, resignCompensation)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    // @Delete()
    // async deleteResignCompensation(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Resign Compensation'
    //     })
    // }

    // @Get(":id")
    // async getResignCompensation(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Get Resign Compensation'
    //     })
    // }

    @Get()
    async getAllResignCompensation(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.resignCompensationService.findResignCompensation(user)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Patch()
    async editResignCompensation(@UserDoc() user: any ,@Res() res:Response, @Body() edit:resignCompensationDto){
        const result = await this.resignCompensationService.editResignCompensation(user, edit)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }
}
