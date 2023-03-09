import { Module } from '@nestjs/common';
import { CurrencyRateService } from './currency-rate.service';
import { CurrencyRateController } from './currency-rate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyRateSchema } from './currency-rate.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "CurrencyRate",schema: CurrencyRateSchema}])],
  providers: [CurrencyRateService],
  controllers: [CurrencyRateController],
  exports: [CurrencyRateService]
})
export class CurrencyRateModule {}
