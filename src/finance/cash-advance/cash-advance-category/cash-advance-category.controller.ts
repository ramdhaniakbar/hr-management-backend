import { Body, Controller, Delete, Get, HttpStatus, Post, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { cashAdvanceCategoryDto } from './dto';
import { CashAdvanceCategoryService } from './cash-advance-category.service';

@UseGuards(JwtAuthGuard)
@Controller('cash-advance-category')
export class CashAdvanceCategoryController{
    constructor(
        private cashAdvanceCategoryService: CashAdvanceCategoryService
    ){}

        @Post()
        async createCashAdvanceCategory(@UserDoc() user: any ,@Res() res:Response, @Body() cashAdvanceCategory: cashAdvanceCategoryDto){
            const result = await this.cashAdvanceCategoryService.createcashAdvanceCategory(user, cashAdvanceCategory)
            return res.status(HttpStatus.OK).json({
                message: result
            })
        }
    
        @Delete(":id")
        async deleteCashAdvanceCategory(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id:any){
            const result = await this.cashAdvanceCategoryService.deleteOnecashAdvanceCategory(user, id)
            return res.status(HttpStatus.OK).json({
                message: result
            })
        }

        @Get(":id")
        async getOneCashAdvanceCategory(@UserDoc() user: any ,@Res() res:Response, @Param('id', new ValidateObjectId()) id: any){
            const result = await this.cashAdvanceCategoryService.findOnecashAdvanceCategory(user, id) 
            return res.status(HttpStatus.OK).json({
                message:result
            })
        }

        @Get()
        async getAllCashAdvanceCategory(@UserDoc() user: any ,@Res() res:Response){
            const result = await this.cashAdvanceCategoryService.findAllcashAdvanceCategory(user)
            return res.status(HttpStatus.OK).json({
                message:result
            })
        }

        @Patch(":id")
        async updateCashAdvanveCategory(@UserDoc() user: any ,@Res() res:Response, @Body() edit:cashAdvanceCategoryDto,@Param('id', new ValidateObjectId()) id: any){
            const result = await this.cashAdvanceCategoryService.updateCashAdvanceCategory(user,edit,id)
            return res.status(HttpStatus.OK).json({
                result: result
            })
        }
    
    }
