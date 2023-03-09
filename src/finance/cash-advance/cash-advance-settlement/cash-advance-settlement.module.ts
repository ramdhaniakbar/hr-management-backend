import { Module } from '@nestjs/common';
import { CashAdvanceSettlementService } from './cash-advance-settlement.service';
import { CashAdvanceSettlementController } from './cash-advance-settlement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CashAdvanceSettlementSchema } from './cash-advance-settlement.mocel';

@Module({
  imports:[MongooseModule.forFeature([{name: "CashAdvanceSettlement",schema: CashAdvanceSettlementSchema}])],
  providers: [CashAdvanceSettlementService],
  controllers: [CashAdvanceSettlementController]
})
export class CashAdvanceSettlementModule {}
