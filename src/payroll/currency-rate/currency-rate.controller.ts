import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { CurrencyRateService } from './currency-rate.service';
import { currencyRateDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('currency-rate')
export class CurrencyRateController {
    
    constructor(private currencyRateService: CurrencyRateService){}

    @Post()
    async createCurrencyRate(@UserDoc() user: any ,@Res() res:Response, @Body() currencyRate:currencyRateDto){
        const result = await this.currencyRateService.createCurrencyRate(user, currencyRate)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Delete(":id")
    async deleteCurrencyRate(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.currencyRateService.deleteCurrencyRate(user, id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get(":id")
    async getCurrencyRate(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.currencyRateService.findOneCurrencyRate(user,id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get()
    async getAllCurrencyRate(@UserDoc() user: any ,@Res() res:Response){
        const result = await this.currencyRateService.findCurrencyRate(user)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Patch(":id")
    async editCurrencyRate(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any, @Param('id', new ValidateObjectId()) id: any){
        const result = await this.currencyRateService.editCurrencyRate(user, edit, id)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }


}
