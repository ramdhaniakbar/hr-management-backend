import { Module } from '@nestjs/common';
import { EmployeePayrollService } from './employee-payroll.service';
import { EmployeePayrollController } from './employee-payroll.controller';
import { EmployeePayrollSchema } from './employee-payroll.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "EmployeePayroll",schema: EmployeePayrollSchema}])],
  providers: [EmployeePayrollService],
  controllers: [EmployeePayrollController],
  exports: [EmployeePayrollService]
})
export class EmployeePayrollModule {}
