import { Module } from '@nestjs/common';
import { ThrSettingService } from './thr-setting.service';
import { ThrSettingController } from './thr-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrSettingSchema } from './thr-setting.model';
import { PayrollComponentAllowanceModule } from '../payroll-component-allowance/payroll-component-allowance.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "ThrSetting",schema: ThrSettingSchema}]), PayrollComponentAllowanceModule],
  providers: [ThrSettingService],
  controllers: [ThrSettingController]
})
export class ThrSettingModule {}
