import { Module } from '@nestjs/common';
import { PayrollComponentAllowanceService } from './payroll-component-allowance.service';
import { PayrollComponentAllowanceController } from './payroll-component-allowance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollComponentAllowanceSchema } from './payroll-component-allowance.model';
import { CompanyModule } from 'src/company/company.module';
import { CurrencyRateModule } from '../currency-rate/currency-rate.module';
import { PaymentScheduleModule } from '../payment-schedule/payment-schedule.module';
import { PayrollScheduleModule } from '../payroll-schedule/payroll-schedule.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "PayrollComponentAllowance",schema: PayrollComponentAllowanceSchema}]), CompanyModule, CurrencyRateModule,PaymentScheduleModule, PayrollScheduleModule],
  providers: [PayrollComponentAllowanceService],
  controllers: [PayrollComponentAllowanceController],
  exports: [PayrollComponentAllowanceService]
})
export class PayrollComponentAllowanceModule {}
