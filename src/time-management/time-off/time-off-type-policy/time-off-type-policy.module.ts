import { Module } from '@nestjs/common';
import { TimeOffTypePolicyService } from './time-off-type-policy.service';
import { TimeOffTypePolicyController } from './time-off-type-policy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeOffTypePolicySchema } from './time-off-type-policy.model';
import { CompanyModule } from 'src/company/company.module';
import { TimeOffTypePolicySettingModule } from '../time-off-type-policy-setting/time-off-type-policy-setting.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "TimeOffTypePolicy",schema: TimeOffTypePolicySchema}]), CompanyModule, TimeOffTypePolicySettingModule],
  providers: [TimeOffTypePolicyService],
  controllers: [TimeOffTypePolicyController],
  exports: [TimeOffTypePolicyService]
})
export class TimeOffTypePolicyModule {}
