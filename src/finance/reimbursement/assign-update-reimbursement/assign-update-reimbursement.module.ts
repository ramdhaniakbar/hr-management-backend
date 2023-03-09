import { Module } from '@nestjs/common';
import { AssignUpdateReimbursementService } from './assign-update-reimbursement.service';
import { AssignUpdateReimbursementController } from './assign-update-reimbursement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignUpdateReimbursementSchema } from './assign-update-reimbursement.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "AssignUpdateReimbursement",schema: AssignUpdateReimbursementSchema}])],
  providers: [AssignUpdateReimbursementService],
  controllers: [AssignUpdateReimbursementController]
})
export class AssignUpdateReimbursementModule {}
