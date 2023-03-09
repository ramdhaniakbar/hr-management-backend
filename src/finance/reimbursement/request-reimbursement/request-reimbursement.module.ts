import { Module } from '@nestjs/common';
import { RequestReimbursementService } from './request-reimbursement.service';
import { RequestReimbursementController } from './request-reimbursement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestReimbursementSchema } from './request-reimbursement.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "RequestReimbursement",schema: RequestReimbursementSchema}])],
  providers: [RequestReimbursementService],
  controllers: [RequestReimbursementController]
})
export class RequestReimbursementModule {}
