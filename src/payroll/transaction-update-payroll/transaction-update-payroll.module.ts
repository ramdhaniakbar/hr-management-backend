import { Module } from '@nestjs/common';
import { TransactionUpdatePayrollService } from './transaction-update-payroll.service';
import { TransactionUpdatePayrollController } from './transaction-update-payroll.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionUpdatePayrollSchema } from './transaction-update-payroll.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "TransactionUpdatePayroll",schema: TransactionUpdatePayrollSchema}])],
  providers: [TransactionUpdatePayrollService],
  controllers: [TransactionUpdatePayrollController]
})
export class TransactionUpdatePayrollModule {}
