import { Module } from '@nestjs/common';
import { RequestAttendanceService } from './request-attendance.service';
import { RequestAttendanceController } from './request-attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestAttendanceSchema } from './request-attendance.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "RequestAttendance",schema: RequestAttendanceSchema}])],
  providers: [RequestAttendanceService],
  controllers: [RequestAttendanceController]
})
export class RequestAttendanceModule {}
