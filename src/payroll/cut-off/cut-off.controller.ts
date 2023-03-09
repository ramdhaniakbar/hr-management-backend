import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { checkAbility } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
import { AbilityGuard } from 'src/ability/ability.guard';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { CutOffService } from './cut-off.service';
import { cutOffDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('cut-off')
export class CutOffController {

    constructor(private readonly cutOffService: CutOffService){}
    
    @UseGuards(AbilityGuard)
    @checkAbility({ action: Action.Create, subject: 'cut-off' })
    @Post()
    async createCutOff(@UserDoc() user: any ,@Res() res:Response, @Body() cutOff:cutOffDto){
        const result = await this.cutOffService.createCutOff(user, cutOff)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    // @Delete()
    // async deleteCutOff(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Cut Off'
    //     })
    // }

    // @Get(":id")
    // async getCutOff(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Get One Cut Off'
    //     })
    // }

    @UseGuards(AbilityGuard)
    @checkAbility({ action: Action.Read, subject: 'cut-off' })
    @Get()
    async getCutOff(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.cutOffService.findCutOff(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @UseGuards(AbilityGuard)
    @checkAbility({ action: Action.Update, subject: 'cut-off' })
    @Patch()
    async editCutOff(@UserDoc() user: any ,@Res() res:Response, @Body() edit:cutOffDto){
        const result = await this.cutOffService.editCutOff(user, edit)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }
}
