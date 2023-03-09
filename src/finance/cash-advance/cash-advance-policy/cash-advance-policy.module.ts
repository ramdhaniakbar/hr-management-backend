import { Module } from '@nestjs/common';
import { CashAdvancePolicyService } from './cash-advance-policy.service';
import { CashAdvancePolicyController } from './cash-advance-policy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CashAdvancePolicySchema } from './cash-advance-policy.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "CashAdvancePolicy",schema: CashAdvancePolicySchema}])],
  providers: [CashAdvancePolicyService],
  controllers: [CashAdvancePolicyController]
})
export class CashAdvancePolicyModule {}
