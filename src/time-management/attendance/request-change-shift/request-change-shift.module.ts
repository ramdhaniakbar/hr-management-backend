import { Module } from '@nestjs/common';
import { RequestChangeShiftService } from './request-change-shift.service';
import { RequestChangeShiftController } from './request-change-shift.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestChangeShiftSchema } from './request.change.shift.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "RequestChangeShift",schema: RequestChangeShiftSchema}])],
  providers: [RequestChangeShiftService],
  controllers: [RequestChangeShiftController]
})
export class RequestChangeShiftModule {}
