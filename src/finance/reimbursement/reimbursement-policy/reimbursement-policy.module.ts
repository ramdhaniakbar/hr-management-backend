import { Module } from '@nestjs/common';
import { ReimbursementPolicyService } from './reimbursement-policy.service';
import { ReimbursementPolicyController } from './reimbursement-policy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReimbursementPolicySchema } from './reimbursement-policy.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "ReimbursementPolicy",schema: ReimbursementPolicySchema}])],
  providers: [ReimbursementPolicyService],
  controllers: [ReimbursementPolicyController]
})
export class ReimbursementPolicyModule {}
