import { Module } from '@nestjs/common';
import { PayslipService } from './payslip.service';
import { PayslipController } from './payslip.controller';
import { PayslipSchema } from './payslip.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "Payslip",schema: PayslipSchema}])],
  providers: [PayslipService],
  controllers: [PayslipController]
})
export class PayslipModule {}
