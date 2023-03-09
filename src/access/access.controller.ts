import { Body, Controller, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessService } from './access.service';
import { AccessDto } from './dto/';
import { CompanyAuthGuard, JwtAuthGuard} from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';

@Controller('access-role')
export class AccessController{
    constructor(private accesService: AccessService){}

    @UseGuards(CompanyAuthGuard)
    @Post('addSuper')
    async addRole(@UserDoc() user: any,@Res() res: Response, @Req() req: Request, @Body() accessDto: AccessDto){
        const newRole = await this.accesService.addAccessSuper(accessDto, user) 

        return res.status(HttpStatus.OK).json({
            message: 'success',
            accessRole: newRole
        })
    }

    //if you use @Res then you can't just return an object but must return res.status etc
    //need the role of superadmin to do
    @UseGuards(JwtAuthGuard)
    @Post('addRoleAdmin')
    async addRoleAdmin(@UserDoc() user: any,@Res() res: Response, @Req() req: Request, @Body() accessDto: AccessDto){

        const newRole = await this.accesService.addAccessAdmin(accessDto, user) 

        return res.status(HttpStatus.OK).json({
            message: 'success',
            accessRole: newRole
        })
    }

    //need the role of admin or superadmin to do
    @Post('add-role-employee')
    async addRoleEmployee(@Res() res: Response, @Req() req: Request, @Body() accessDto: AccessDto){}

    @Patch('editRole')
    async add(){
        return "success"
    }

}
