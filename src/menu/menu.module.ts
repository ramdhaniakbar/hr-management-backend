import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessModule } from 'src/access/access.module';
import { MenuController } from './menu.controller';
import { MenuSchema } from './menu.model';
import { MenuService } from './menu.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema}]), AccessModule],
    providers: [MenuService],
    controllers: [MenuController]
})
export class MenuModule {}
