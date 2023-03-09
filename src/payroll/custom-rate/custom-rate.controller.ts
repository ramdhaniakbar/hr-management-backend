import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { CustomRateService } from './custom-rate.service';
import { customRateDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('custom-rate')
export class CustomRateController {
    
    constructor(
        private customRateService: CustomRateService
    ){}

    @Post()
    async createCustomRate(@UserDoc() user: any ,@Res() res:Response, @Body() customRate:customRateDto){
        const result = await this.customRateService.createCustomRate(user,customRate)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Delete(":id")
    async deleteCustomRate(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.customRateService.deleteCustomRate(user, id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get(":id")
    async getCustomRate(@UserDoc() user: any ,@Res() res:Response,@Param('id', new ValidateObjectId()) id: any){
        const result = await this.customRateService.findOneCustomRate(user,id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Get()
    async getAllCustomRate(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.customRateService.findCustomRate(user)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    @Patch(":id")
    async editCustomRate(@UserDoc() user: any ,@Res() res:Response, @Body() edit:customRateDto, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.customRateService.editCustomRate(user,edit,id)
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }
}
