import { Module } from '@nestjs/common';
import { TimeOffCompensationSettingService } from './time-off-compensation-setting.service';
import { TimeOffCompensationSettingController } from './time-off-compensation-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeOffCompensationSettingSchema } from './time-off-compensation-setting.model';
import { PayrollComponentAllowanceModule } from '../payroll-component-allowance/payroll-component-allowance.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TimeOffCompensationSetting',
        schema: TimeOffCompensationSettingSchema,
      },
    ]),
    PayrollComponentAllowanceModule,
  ],
  providers: [TimeOffCompensationSettingService],
  controllers: [TimeOffCompensationSettingController],
})
export class TimeOffCompensationSettingModule {}
