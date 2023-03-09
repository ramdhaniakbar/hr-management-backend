import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('employee-resignation')
export class EmployeeResignationController {

    @Post()
    async createEmployeeResignation(@UserDoc() user: any ,@Res() res:Response, @Body() employeeResignation:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Employee Resignation'
        })
    }

    // @Delete()
    // async deleteEmployeeResignation(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Employee Resignation'
    //     })
    // }

    @Get(":id")
    async getEmployeeResignation(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Employee Resignation'
        })
    }

    @Get()
    async getAllEmployeeResignation(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Employee Resignation in company'
        })
    }

    @Patch()
    async editEmployeeResignation(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Employee Resignation'
        })
    }

}
