import { Module } from '@nestjs/common';
import { AttendanceMachineSettingService } from './attendance-machine-setting.service';
import { AttendanceMachineSettingController } from './attendance-machine-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceMachineSettingSchema } from './attendance-machine-setting.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "AttendanceMachineSetting",schema: AttendanceMachineSettingSchema}])],
  providers: [AttendanceMachineSettingService],
  controllers: [AttendanceMachineSettingController]
})
export class AttendanceMachineSettingModule {}
