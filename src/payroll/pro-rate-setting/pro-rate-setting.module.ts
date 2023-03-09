import { Module } from '@nestjs/common';
import { ProRateSettingService } from './pro-rate-setting.service';
import { ProRateSettingController } from './pro-rate-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProRateSettingSchema } from './pro-rate-setting.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "ProRateSetting",schema: ProRateSettingSchema}])],
  providers: [ProRateSettingService],
  controllers: [ProRateSettingController],
  exports: [ProRateSettingService]
})
export class ProRateSettingModule {}
