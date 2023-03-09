import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterOvertimeModule } from '../master-overtime/master-overtime.module';
import { OvertimeDefaultController } from './overtime-default.controller';
import { OvertimeDefaultSchema } from './overtime-default.model';
import { OvertimeDefaultService } from './overtime-default.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OvertimeDefault', schema: OvertimeDefaultSchema },
    ]),
    MasterOvertimeModule,
  ],
  controllers: [OvertimeDefaultController],
  providers: [OvertimeDefaultService],
  exports: [OvertimeDefaultService]
})
export class OvertimeDefaultModule {}
