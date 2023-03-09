import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanSchema } from './models/loan.model';
import { LoanNameSchema } from './models/loan-name.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "Loan",schema: LoanSchema}, {name: "LoanName",schema: LoanNameSchema}])],
  providers: [LoanService],
  controllers: [LoanController]
})
export class LoanModule {}
