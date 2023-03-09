import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeOffTypePolicySettingController } from './time-off-type-policy-setting.controller';
import { TimeOffTypePolicySettingSchema } from './time-off-type-policy-setting.model';
import { TimeOffTypePolicySettingService } from './time-off-type-policy-setting.service';

@Module({
  imports:[MongooseModule.forFeature([{name:"TimeOffTypePolicySetting",schema: TimeOffTypePolicySettingSchema}])],
  controllers: [TimeOffTypePolicySettingController],
  providers: [TimeOffTypePolicySettingService],
  exports: [TimeOffTypePolicySettingService]
})
export class TimeOffTypePolicySettingModule {}
