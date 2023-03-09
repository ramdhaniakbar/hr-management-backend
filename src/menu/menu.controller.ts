import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService){}

    @Post('addMenu')
    async addMenu(@Res() res: Response, @Body('menuName') menuName: string, @Body('controller') controller: string ){
        const menu = await this.menuService.addMenu(menuName, controller)
        return res.status(HttpStatus.OK).json({
            menu: menu
        })
    }

}
