import { Module } from '@nestjs/common';
import { RequestTimeOffService } from './request-time-off.service';
import { RequestTimeOffController } from './request-time-off.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestTimeOffSchema } from './request-time-off.model';
import { TimeOffTypePolicyModule } from '../time-off-type-policy/time-off-type-policy.module';
import { TimeOffTypePolicySettingService } from '../time-off-type-policy-setting/time-off-type-policy-setting.service';
import { TimeOffTypePolicySettingModule } from '../time-off-type-policy-setting/time-off-type-policy-setting.module';
import { TimeOffBalanceModule } from '../time-off-balance/time-off-balance.module';
import { UserModule } from 'src/users/users.module';
import { RequestDelegationModule } from 'src/users/request-delegation/request-delegation.module';
import { InboxModule } from 'src/users/inbox/inbox.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "RequestTimeOff",schema: RequestTimeOffSchema}]), TimeOffTypePolicyModule, TimeOffTypePolicySettingModule, TimeOffBalanceModule, UserModule, RequestDelegationModule, InboxModule],
  providers: [RequestTimeOffService],
  controllers: [RequestTimeOffController],
  exports: [RequestTimeOffService]
})
export class RequestTimeOffModule {}
