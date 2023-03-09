import { Module } from '@nestjs/common';
import { AbsenceSettingService } from './absence-setting.service';
import { AbsenceSettingController } from './absence-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsenceSettingSchema } from './absence-setting.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "AbsenceSetting",schema: AbsenceSettingSchema}])],
  providers: [AbsenceSettingService],
  controllers: [AbsenceSettingController],
  exports:[AbsenceSettingService],
})
export class AbsenceSettingModule {}
