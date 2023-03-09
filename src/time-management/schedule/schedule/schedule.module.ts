import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchema } from './schedule.model';
import { ShiftPatternModule } from '../shift-pattern/shift-pattern.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "Schedule",schema: ScheduleSchema}]), ShiftPatternModule],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService]
})
export class SchedulesModule {}
