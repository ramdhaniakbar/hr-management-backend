import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InboxModule } from '../inbox/inbox.module';
import { RequestDelegationController } from './request-delegation.controller';
import { RequestDelegationSchema } from './request-delegation.model';
import { RequestDelegationService } from './request-delegation.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'RequestDelegation', schema: RequestDelegationSchema}]),InboxModule],
  providers: [RequestDelegationService],
  controllers: [RequestDelegationController],
  exports:[RequestDelegationService]
})
export class RequestDelegationModule {}
