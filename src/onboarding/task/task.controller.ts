import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
        
    @Post()
    async createTask(@UserDoc() user: any ,@Res() res:Response, @Body() task:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Task'
        })
    }

    @Delete()
    async deleteTask(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete Task'
        })
    }

    @Get(":id")
    async getTask(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Task'
        })
    }

    @Get()
    async getAllTask(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Task in company'
        })
    }

    @Patch()
    async editTask(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Task'
        })
    }
}
