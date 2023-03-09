import { Module } from '@nestjs/common';
import { PayrollComponentBenefitService } from './payroll-component-benefit.service';
import { PayrollComponentBenefitController } from './payroll-component-benefit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollComponentBenefitSchema } from './payroll-component-benefit.model';
import { CompanyModule } from 'src/company/company.module';
import { CurrencyRateModule } from '../currency-rate/currency-rate.module';
import { PayrollScheduleModule } from '../payroll-schedule/payroll-schedule.module';
import { PaymentScheduleModule } from '../payment-schedule/payment-schedule.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "PayrollComponentBenefit",schema: PayrollComponentBenefitSchema}]), CompanyModule, CurrencyRateModule, PayrollScheduleModule, PaymentScheduleModule],
  providers: [PayrollComponentBenefitService],
  controllers: [PayrollComponentBenefitController],
  exports: [PayrollComponentBenefitService]
})
export class PayrollComponentBenefitModule {}
