import { Module } from '@nestjs/common';
import { CustomRateService } from './custom-rate.service';
import { CustomRateController } from './custom-rate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomRateSchema } from './custom-rate.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "CustomRate",schema: CustomRateSchema}])],
  providers: [CustomRateService],
  controllers: [CustomRateController],
  exports: [CustomRateService]
})
export class CustomRateModule {}
