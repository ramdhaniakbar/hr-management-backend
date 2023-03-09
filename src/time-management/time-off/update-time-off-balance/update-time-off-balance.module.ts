import { Module } from '@nestjs/common';
import { UpdateTimeOffBalanceService } from './update-time-off-balance.service';
import { UpdateTimeOffBalanceController } from './update-time-off-balance.controller';
import { UpdateTimeOffBalanceSchema } from './update-time-off-balance.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "UpdateTimeOffBalance",schema: UpdateTimeOffBalanceSchema}])],
  providers: [UpdateTimeOffBalanceService],
  controllers: [UpdateTimeOffBalanceController]
})
export class UpdateTimeOffBalanceModule {}
