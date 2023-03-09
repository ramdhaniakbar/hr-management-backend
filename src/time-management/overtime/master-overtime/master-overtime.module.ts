import { Module } from '@nestjs/common';
import { MasterOvertimeService } from './master-overtime.service';
import { MasterOvertimeController } from './master-overtime.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterOvertimeSchema } from './master-overtime.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MasterOvertime', schema: MasterOvertimeSchema },
    ]),
  ],
  providers: [MasterOvertimeService],
  controllers: [MasterOvertimeController],
  exports: [MasterOvertimeService],
})
export class MasterOvertimeModule {}
