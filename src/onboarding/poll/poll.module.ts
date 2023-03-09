import { forwardRef, Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { PollSchema } from './poll.model';
import { MongooseModule } from '@nestjs/mongoose';
import { InboxModule } from 'src/users/inbox/inbox.module';
import { AnnouncementModule } from '../announcement/announcement.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "Poll",schema: PollSchema}]), forwardRef(()=> AnnouncementModule)],
  providers: [PollService],
  controllers: [PollController],
  exports: [PollService]
})
export class PollModule {}
