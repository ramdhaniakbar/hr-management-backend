import { Module } from '@nestjs/common';
import { OvertimeCompanySettingsService } from './overtime-company-settings.service';
import { OvertimeCompanySettingsController } from './overtime-company-settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OvertimeCompanySettingsSchema } from './overtime-company-settings.model';
import { ShiftDetailTypeModule } from 'src/time-management/schedule/shift-detail-type/shift-detail-type.module';
import { PaymentScheduleModule } from 'src/payroll/payment-schedule/payment-schedule.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'OvertimeCompanySettings',
        schema: OvertimeCompanySettingsSchema,
      },
    ]),
    ShiftDetailTypeModule,
    PaymentScheduleModule,
  ],
  providers: [OvertimeCompanySettingsService],
  controllers: [OvertimeCompanySettingsController],
})
export class OvertimeCompanySettingsModule {}
