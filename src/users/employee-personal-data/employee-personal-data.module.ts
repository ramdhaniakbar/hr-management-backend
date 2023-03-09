import { forwardRef, Module } from '@nestjs/common';
import { EmployeePersonalDataService } from './employee-personal-data.service';
import { EmployeePersonalDataController } from './employee-personal-data.controller';
import { EmployeePersonalDataSchema } from './employee-personal-data.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../users.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "EmployeePersonalData",schema: EmployeePersonalDataSchema}]), forwardRef(()=>UserModule)],
  providers: [EmployeePersonalDataService],
  controllers: [EmployeePersonalDataController],
  exports: [EmployeePersonalDataService]
})
export class EmployeePersonalDataModule {}
