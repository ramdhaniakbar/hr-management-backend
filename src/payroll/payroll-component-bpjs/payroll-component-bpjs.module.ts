import { Module } from '@nestjs/common';
import { PayrollComponentBpjsService } from './payroll-component-bpjs.service';
import { PayrollComponentBpjsController } from './payroll-component-bpjs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollComponentBpjsSchema } from './payroll-component-bpjs.model';
import { PayrollComponentAllowanceModule } from '../payroll-component-allowance/payroll-component-allowance.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "PayrollComponentBpjs",schema: PayrollComponentBpjsSchema}]), PayrollComponentAllowanceModule],
  providers: [PayrollComponentBpjsService],
  controllers: [PayrollComponentBpjsController],
  exports: [PayrollComponentBpjsService]
})
export class PayrollComponentBpjsModule {}
