import { Controller, Body, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards, Param, UseInterceptors, ParseFilePipe, UploadedFile, MaxFileSizeValidator, FileTypeValidator, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { rmSync } from 'fs';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { RequestTimeOffAttachmentOption } from 'src/utility/request-time-off-attachment-multer-option';
import { requestTimeOffDto } from './dto';
import { RequestTimeOffService } from './request-time-off.service';

@UseGuards(JwtAuthGuard)
@Controller('request-time-off')
export class RequestTimeOffController {

    constructor(
        private requestTimeOffService:RequestTimeOffService
        ){}

   //validasi file upload harus ada dilakukan dari front-end juga 
   //nama file udah harus berdasarkan _id requestnya
    @Post("upload-attachment/:id")
    @UseInterceptors(FileInterceptor("attachment",RequestTimeOffAttachmentOption))
    async uploadAttachment(@UploadedFile(
        new ParseFilePipe({
            validators:[
                new MaxFileSizeValidator({maxSize: 5000000}),
                new FileTypeValidator({fileType: 'jpeg|png|jpg|pdf'})
            ]
        })
    ) file:Express.Multer.File, @Param("id", new ValidateObjectId())id:any){
        const result = await this.requestTimeOffService.uploadAttachment(id,file.path)
        return file.path
    }

    //pada request timeOff attachment diupload pada request yang terppisah
    //nama attachment filenya dikirim juga pada request time offnya
    @Post()
    async createRequestTimeOff(@UserDoc() user: any ,@Res() res:Response, @Body() requestTimeOff:requestTimeOffDto){
        let result = await this.requestTimeOffService.createRequestTimeOff(user, requestTimeOff)
        
        return res.status(HttpStatus.OK).json({
            result: result
        })
    }

    // @Delete()
    // async deleteRequestTimeOff(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Delete Request Time Off'
    //     })
    // }

    @Get(":id")
    async getRequestTimeOff(@UserDoc() user: any ,@Res() res:Response,@Req()req:any, @Param('id', new ValidateObjectId()) id: any){
        var local = req.get('host')
        console.log(req)
        let result = await this.requestTimeOffService.findRequestTimeOffById(id, local)
        return res.status(HttpStatus.OK).json({
            result:result
        })
    }

    @Get()
    async getUserAllRequestTimeOff(@UserDoc() user: any ,@Res() res:Response, @Req()req:any){
        var local = req.get('host')
        const results = await this.requestTimeOffService.findUserAllRequestTimeOff(user, local)
        return res.status(HttpStatus.OK).json({
            results:results
        })
    }

    @Patch()
    async editRequestTimeOff(@UserDoc() user: any ,@Res() res:Response, @Body() edit:any){
        return res.status(HttpStatus.OK).json({
            message:'Patch Request Time Off'
        })
    }

}
