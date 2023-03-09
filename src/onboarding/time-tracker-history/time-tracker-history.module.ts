import { Module } from '@nestjs/common';
import { TimeTrackerHistoryService } from './time-tracker-history.service';
import { TimeTrackerHistoryController } from './time-tracker-history.controller';
import { TimeTrackerHistorySchema } from './time-tracker-history.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "TimeTrackerHistory",schema: TimeTrackerHistorySchema}])],
  providers: [TimeTrackerHistoryService],
  controllers: [TimeTrackerHistoryController]
})
export class TimeTrackerHistoryModule {}
