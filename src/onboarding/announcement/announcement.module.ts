import { forwardRef,Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementSchema } from './announcement.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { InboxModule } from 'src/users/inbox/inbox.module';
import { PollModule } from '../poll/poll.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "Announcement",schema: AnnouncementSchema}]), CompanyModule, forwardRef(()=> InboxModule)],
  providers: [AnnouncementService],
  controllers: [AnnouncementController],
  exports: [AnnouncementService]
})
export class AnnouncementModule {}
