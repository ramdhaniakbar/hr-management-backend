import { Module } from '@nestjs/common';
import { ReimbursementBalanceService } from './reimbursement-balance.service';
import { ReimbursementBalanceController } from './reimbursement-balance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReimbursementBalanceSchema } from './reimbursement-balance.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "ReimbursementBalance",schema: ReimbursementBalanceSchema}])],
  providers: [ReimbursementBalanceService],
  controllers: [ReimbursementBalanceController]
})
export class ReimbursementBalanceModule {}
