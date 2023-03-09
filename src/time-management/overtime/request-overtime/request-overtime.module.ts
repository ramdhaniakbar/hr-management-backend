import { Module } from '@nestjs/common';
import { RequestOvertimeService } from './request-overtime.service';
import { RequestOvertimeController } from './request-overtime.controller';
import { RequestOvertimeSchema } from './request-overtime.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "RequestOvertime",schema: RequestOvertimeSchema}])],
  providers: [RequestOvertimeService],
  controllers: [RequestOvertimeController]
})
export class RequestOvertimeModule {}
