import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessService } from 'src/access/access.service';
import { Menu } from './menu.model';

@Injectable()
export class MenuService {

    constructor(@InjectModel('Menu') private readonly menuModel: Model<Menu>,
                private accessService: AccessService){}

    async addMenu(menuName:string, controller: string){
        const temp = {menuName, controller}
        const newMenu = new this.menuModel(temp)
        const result = await newMenu.save()
        this.accessService.menuUpdateSuperAdmin(result)
        return result
    }
}
