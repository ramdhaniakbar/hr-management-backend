import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';
import { ActivityLogSchema } from './activity-log.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "ActivityLog",schema: ActivityLogSchema}])],
  providers: [ActivityLogService],
  controllers: [ActivityLogController]
})
export class ActivityLogModule {}
