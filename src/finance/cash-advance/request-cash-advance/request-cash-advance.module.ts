import { Module } from '@nestjs/common';
import { RequestCashAdvanceService } from './request-cash-advance.service';
import { RequestCashAdvanceController } from './request-cash-advance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestCashAdvanceSchema } from './request-cash-advance.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "RequestCashAdvance",schema: RequestCashAdvanceSchema}])],
  providers: [RequestCashAdvanceService],
  controllers: [RequestCashAdvanceController]
})
export class RequestCashAdvanceModule {}
