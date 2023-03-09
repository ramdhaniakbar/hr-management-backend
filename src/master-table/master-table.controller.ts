import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { MasterTableService } from './master-table.service';

@Controller('master-table')
export class MasterTableController {
  constructor(private readonly masterTableService: MasterTableService) {}

  //master-bank
  @Post('bank')
  async addMasterBank(
    @Res() res: Response,
    @Body('bankName') bankName: string,
  ) {
    const addBank = await this.masterTableService.addMasterBank(bankName);
    return res.status(HttpStatus.OK).json({
      bank: addBank,
    });
  }

  @Get('bank/:id')
  async findMasterBank(@Param('id') id: any) {
    return this.masterTableService.findMasterBank(id);
  }

  @Delete('bank/:id')
  async deleteMasterBank(@Res() res: Response, @Param('id') id: any) {
    const deleteBank = await this.masterTableService.deleteMasterBank(id);
    return res.status(HttpStatus.OK).json({
      bank: deleteBank,
    });
  }

  @Get('bank')
  async getAllMasterBank() {
    return this.masterTableService.getAllMasterBank();
  }

  //master-menu
  @Post('menu')
  async addMasterMenu(
    @Res() res: Response,
    @Body('menuName') menuName: string,
    @Body('controller') controller: string,
  ) {
    const menu = await this.masterTableService.addMasterMenu(
      menuName,
      controller,
    );
    return res.status(HttpStatus.OK).json({
      menu: menu,
    });
  }

  @Delete('menu/:id')
  async deleteMasterMenu(@Res() res: Response, @Param('id') id: any) {
    console.log(id);

    const deleteMenu = await this.masterTableService.deleteMasterMenu(id);
    return res.status(HttpStatus.OK).json({
      menu: deleteMenu,
    });
  }

  @Get('menu')
  async getAllMasterMenu() {
    return this.masterTableService.getAllMasterMenu();
  }

  //master-national-holiday
  @Post('national-holiday')
         async addMasterNationalHoliday(
            @Res() res: Response,
             @Body('holidayDate') holidayDate: any,
             @Body('holidayName') holidayName: string,
         ) {
             const holiday = await this.masterTableService.addMasterNationalHoliday(
                 holidayDate,
                 holidayName,
             );
             return res.status(HttpStatus.OK).json({
                 holiday: holiday
             });
         }
    
        @Delete('national-holiday/:id')
        async deleteMasterNationalHoliday(@Res() res: Response, @Param('id') id: any) {
            console.log(id);

            const deleteHoliday = await this.masterTableService.deleteMasterNationalHoliday(id);
            return res.status(HttpStatus.OK).json({
                holiday: deleteHoliday
            });
        }

        @Get('national-holiday')
        async getAllMasterNationalHoliday(){
            return this.masterTableService.getAllMasterNationalHoliday();
        }
    

        //master-umr
        @Post('umr')
        async addMasterUmr(
             @Res() res: Response,
             @Body('city') city: any,
             @Body('umr') umr: number,
         ) {
             const addUmr = await this.masterTableService.addMasterUmr(
                 city,
                 umr,
             );
             return res.status(HttpStatus.OK).json({
                umr: addUmr
             });
         }
    
         @Delete('umr/:id')
         async deleteMasterUmr(@Res() res: Response, @Param('id') id: any) {
             console.log(id);
 
             const deleteUmr = await this.masterTableService.deleteMasterUmr(id);
             return res.status(HttpStatus.OK).json({
                 umr: deleteUmr
             });
         }

         @Get('umr')
         async getAllMasterUmr(){
             return this.masterTableService.getAllMasterUmr();
         }
    

        //master-state-province
        @Post('state-province')
        async addMasterState(
             @Res() res: Response,
             @Body('stateProvinceName') stateProvinceName: string,
             @Body('city') city: any,
         ) {
             const addState = await this.masterTableService.addMasterState(
                 stateProvinceName,
                 city,
             );
             return res.status(HttpStatus.OK).json({
                state: addState
             });
         }
    
         @Delete('state-province/:id')
         async deleteMasterState(@Res() res: Response, @Param('id') id: any) {
             console.log(id);
 
             const deleteState = await this.masterTableService.deleteMasterState(id);
             return res.status(HttpStatus.OK).json({
                 state: deleteState
             });
         }

         @Get('state-province')
         async getAllMasterState(){
             return this.masterTableService.getAllMasterState();
         }
}
