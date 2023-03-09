import { forwardRef, Module } from '@nestjs/common';
import { TimeOffBalanceService } from './time-off-balance.service';
import { TimeOffBalanceController } from './time-off-balance.controller';
import { TimeOffBalanceSchema } from './time-off-balance.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeOffTypePolicyModule } from '../time-off-type-policy/time-off-type-policy.module';
import { UserModule } from 'src/users/users.module';
import { TimeOffTypePolicySettingModule } from '../time-off-type-policy-setting/time-off-type-policy-setting.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "TimeOffBalance",schema: TimeOffBalanceSchema}]), TimeOffTypePolicyModule, forwardRef(()=> UserModule), TimeOffTypePolicySettingModule ],
  providers: [TimeOffBalanceService],
  controllers: [TimeOffBalanceController],
  exports: [TimeOffBalanceService]
})
export class TimeOffBalanceModule {}
