import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('employee-payroll')
export class EmployeePayrollController {

    @Post()
    async createEmployeePayroll(@UserDoc() user: any ,@Res() res:Response, @Body() employeePayroll:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Employee Payroll'
        })
    }

    // @Delete()
    // async deleteEmployeePayroll(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Employee Payroll'
    //     })
    // }

    @Get(":id")
    async getEmployeePayroll(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Employee Payroll'
        })
    }

    // @Get()
    // async getAllEmployeePayroll(@UserDoc() user: any ,@Res() res:Response){
    //     return res.status(HttpStatus.OK).json({
    //         message:'Get All Employee Payroll in company'
    //     })
    // }

    @Patch()
    async editEmployeePayroll(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Employee Payroll'
        })
    }

}
