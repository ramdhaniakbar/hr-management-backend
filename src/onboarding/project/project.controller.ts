import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
    
    @Post()
    async createProject(@UserDoc() user: any ,@Res() res:Response, @Body() project:any){
        return res.status(HttpStatus.OK).json({
            message: 'Post Project'
        })
    }

    @Delete()
    async deleteProject(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
        return res.status(HttpStatus.OK).json({
            message: 'Delete Project'
        })
    }

    @Get(":id")
    async getProject(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
        return res.status(HttpStatus.OK).json({
            message:'Get Project'
        })
    }

    @Get()
    async getAllBorrowAsset(@UserDoc() user: any ,@Res() res:Response){
        return res.status(HttpStatus.OK).json({
            message:'Get All Project in company'
        })
    }

    @Patch()
    async editBorrowAsset(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Project'
        })
    }
}
