import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';
import { AccessService } from 'src/access/access.service';
import {
  MasterBank,
  MasterMenu,
  MasterNationalHoliday,
  MasterStateProvince,
  MasterUmr,
} from './model';

@Injectable()
export class MasterTableService {

  constructor(
    @InjectModel('MasterBank')
    private readonly masterBankModel: Model<MasterBank>,
    @InjectModel('MasterMenu')
    private readonly masterMenuModel: Model<MasterMenu>,
    @InjectModel('MasterNationalHoliday')
    private readonly masterNationalHolidayModel: Model<MasterNationalHoliday>,
    @InjectModel('MasterUmr') private readonly masterUmrModel: Model<MasterUmr>,
    @InjectModel('MasterStateProvince')
    private readonly masterStateProvinceModel: Model<MasterStateProvince>,
    @Inject(forwardRef(()=>AccessService))
    private accessService: AccessService,
  ) {}

  //master-bank
  async addMasterBank(bankName: string) {
    const temp = { bankName };
    const newBank = new this.masterBankModel(temp);
    const result = await newBank.save();
    return result;
  }

  async findMasterBank(id: any) {
    const findBank = await this.masterBankModel.findOne({ _id: id });
    if(!findBank){
      throw new NotFoundException("no master bank found with the id "+ id)
    }
    return findBank;
  }

  async deleteMasterBank(id: any) {
    const deleteBank = await this.masterBankModel.deleteOne({ _id: id });
    return deleteBank;
  }

  async getAllMasterBank() {
    return await this.masterBankModel.find().exec();
  }

  //master-menu
  async addMasterMenu(menuName: string, controller: string) {
    const temp = { menuName, controller };
    const newMenu = new this.masterMenuModel(temp);
    const result = await newMenu.save();
    await this.accessService.menuUpdateSuperAdmin(result);
    return result;
  }

  async deleteMasterMenu(id: any) {
    await this.accessService.menuDeleteSuperAdmin(id)
    const deleteMenu = await this.masterMenuModel.deleteOne({ _id: id });
    return deleteMenu;
  }

  async getAllMasterMenu() {
    return await this.masterMenuModel.find().exec();
  }

    //master-national-holiday
    async addMasterNationalHoliday(holidayDate: Date, holidayName: string) {
      const temp = { holidayDate, holidayName};
      const newHoliday = new this.masterNationalHolidayModel(temp);
      const result = await newHoliday.save();
      return result;
    }

    async deleteMasterNationalHoliday(id: any) {
      const deleteHoliday = await this.masterNationalHolidayModel.deleteOne({_id: id });
      return deleteHoliday;
    }

    async getAllMasterNationalHoliday() {
      return await this.masterNationalHolidayModel.find().exec();
    }

    //master-umr
    async addMasterUmr(city:any, umr: number){
      const temp = {city, umr}
      const newUmr = new this.masterUmrModel(temp)
      const result = await newUmr.save()
      return result
  }

    async deleteMasterUmr(id: any) {
      const deleteUmr = await this.masterUmrModel.deleteOne({_id: id });
      return deleteUmr;
  }

    async getAllMasterUmr() {
      return await this.masterUmrModel.find().exec();
  }

    //master-state-province
    async addMasterState(stateProvinceName:string, city: any){
      const temp = {stateProvinceName, city}
      const newState = new this.masterStateProvinceModel(temp)
      const result = await newState.save()
      return result
  }

    async deleteMasterState(id: any) {
      const deleteState = await this.masterStateProvinceModel.deleteOne({_id: id });
      return deleteState;
  }

    async getAllMasterState() {
      return await this.masterStateProvinceModel.find().exec();
  }

}
