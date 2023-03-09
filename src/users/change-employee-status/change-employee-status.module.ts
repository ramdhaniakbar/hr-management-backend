import { Module } from '@nestjs/common';
import { ChangeEmployeeStatusService } from './change-employee-status.service';
import { ChangeEmployeeStatusController } from './change-employee-status.controller';
import { ChangeEmployeeStatusSchema } from './change-employee-status.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "ChangeEmployeeStatus",schema: ChangeEmployeeStatusSchema}])],
  providers: [ChangeEmployeeStatusService],
  controllers: [ChangeEmployeeStatusController]
})
export class ChangeEmployeeStatusModule {}
