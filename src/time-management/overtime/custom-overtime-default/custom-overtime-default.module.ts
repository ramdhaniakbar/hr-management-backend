import { Module } from '@nestjs/common';
import { CustomOvertimeDefaultService } from './custom-overtime-default.service';
import { CustomOvertimeDefaultController } from './custom-overtime-default.controller';
import { CustomOvertimeDefaultSchema } from './custom-overtime-default.model';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterOvertimeModule } from '../master-overtime/master-overtime.module';
import { CompanyModule } from 'src/company/company.module';
import { OvertimeDefaultModule } from '../overtime-default/overtime-default.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CustomOvertimeDefault', schema: CustomOvertimeDefaultSchema },
    ]),
    MasterOvertimeModule,
    CompanyModule,
    OvertimeDefaultModule
  ],
  providers: [CustomOvertimeDefaultService],
  controllers: [CustomOvertimeDefaultController],
  exports: [CustomOvertimeDefaultService]
})
export class CustomOvertimeDefaultModule {}
