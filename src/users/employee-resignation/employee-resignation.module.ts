import { Module } from '@nestjs/common';
import { EmployeeResignationService } from './employee-resignation.service';
import { EmployeeResignationController } from './employee-resignation.controller';
import { EmployeeResignationSchema } from './employee-resignation.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "EmployeeResignation",schema: EmployeeResignationSchema}])],
  providers: [EmployeeResignationService],
  controllers: [EmployeeResignationController]
})
export class EmployeeResignationModule {}
