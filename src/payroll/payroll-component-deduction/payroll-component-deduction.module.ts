import { Module } from '@nestjs/common';
import { PayrollComponentDeductionService } from './payroll-component-deduction.service';
import { PayrollComponentDeductionController } from './payroll-component-deduction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollComponentDeductionSchema } from './payroll-component-dedcution.model';
import { CompanyModule } from 'src/company/company.module';
import { CurrencyRateModule } from '../currency-rate/currency-rate.module';
import { PayrollScheduleModule } from '../payroll-schedule/payroll-schedule.module';
import { PaymentScheduleModule } from '../payment-schedule/payment-schedule.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "PayrollComponentDeduction",schema: PayrollComponentDeductionSchema}]), CompanyModule, CurrencyRateModule, PayrollScheduleModule, PaymentScheduleModule],
  providers: [PayrollComponentDeductionService],
  controllers: [PayrollComponentDeductionController],
  exports: [PayrollComponentDeductionService]
})
export class PayrollComponentDeductionModule {}
