import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessModule } from 'src/access/access.module';
import { MasterTableController } from './master-table.controller';
import { MasterTableService } from './master-table.service';
import { MasterBankSchema, MasterMenuSchema, MasterNationalHolidaySchema, MasterStateProvinceSchema, MasterUmrSchema } from './model';

@Module({
    imports:[AccessModule,
                MongooseModule.forFeature([
                    {name: 'MasterBank', schema: MasterBankSchema}, 
                    {name: "MasterMenu", schema: MasterMenuSchema}, 
                    {name: 'MasterNationalHoliday', schema: MasterNationalHolidaySchema}, 
                    {name: 'MasterUmr', schema: MasterUmrSchema}, 
                    {name: 'MasterStateProvince', schema: MasterStateProvinceSchema}
                ])
            ],
    providers:[MasterTableService],
    controllers: [MasterTableController],
    exports: [MasterTableService]
})
export class MasterTableModule {}
