import { Module } from '@nestjs/common';
import { CustomDataService } from './custom-data.service';
import { CustomDataController } from './custom-data.controller';

@Module({
  providers: [CustomDataService],
  controllers: [CustomDataController]
})
export class CustomDataModule {}
