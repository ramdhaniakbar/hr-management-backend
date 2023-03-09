import { Module } from '@nestjs/common';
import { ResignCompensationService } from './resign-compensation.service';
import { ResignCompensationController } from './resign-compensation.controller';
import { ResignCompensationSchema } from './resign-compensation.model';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollComponentAllowanceModule } from '../payroll-component-allowance/payroll-component-allowance.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "ResignCompensation",schema: ResignCompensationSchema}]), PayrollComponentAllowanceModule],
  providers: [ResignCompensationService],
  controllers: [ResignCompensationController],
  exports: [ResignCompensationService]
})
export class ResignCompensationModule {}
