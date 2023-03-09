import { Module } from '@nestjs/common';
import { PaymentScheduleService } from './payment-schedule.service';
import { PaymentScheduleController } from './payment-schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentScheduleSchema } from './payment-schedule.model';
import { PayrollScheduleModule } from '../payroll-schedule/payroll-schedule.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "PaymentSchedule",schema: PaymentScheduleSchema}]), PayrollScheduleModule],
  providers: [PaymentScheduleService],
  controllers: [PaymentScheduleController],
  exports:[PaymentScheduleService]
})
export class PaymentScheduleModule {}
