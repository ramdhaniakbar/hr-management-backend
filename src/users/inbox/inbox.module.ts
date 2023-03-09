import { forwardRef,Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { InboxSchema } from './inbox.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../users.module';
import { PollModule } from 'src/onboarding/poll/poll.module';
import { AnnouncementModule } from 'src/onboarding/announcement/announcement.module';
import { AnnouncementService } from 'src/onboarding/announcement/announcement.service';
import { RequestDelegationModule } from '../request-delegation/request-delegation.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "Inbox",schema: InboxSchema}]), forwardRef(()=> PollModule), forwardRef(()=>AnnouncementModule),forwardRef(()=> UserModule), forwardRef(()=> RequestDelegationModule)],
  providers: [InboxService],
  controllers: [InboxController],
  exports: [InboxService]
})
export class InboxModule {}
