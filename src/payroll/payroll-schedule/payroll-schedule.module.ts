import { Module } from '@nestjs/common';
import { PayrollScheduleService } from './payroll-schedule.service';
import { PayrollScheduleController } from './payroll-schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollScheduleSchema } from './payroll-schedule.model';
import { AbilityModule } from 'src/ability/ability.module';
import { AccessModule } from 'src/access/access.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "PayrollSchedule",schema: PayrollScheduleSchema}]), AbilityModule, AccessModule],
  providers: [PayrollScheduleService],
  controllers: [PayrollScheduleController],
  exports:[PayrollScheduleService]
})
export class PayrollScheduleModule {}
