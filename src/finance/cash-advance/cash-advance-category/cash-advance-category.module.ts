import { Module } from '@nestjs/common';
import { CashAdvanceCategoryService } from './cash-advance-category.service';
import { CashAdvanceCategoryController } from './cash-advance-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CashAdvanceCategorySchema } from './cash-advance-category.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "CashAdvanceCategory",schema: CashAdvanceCategorySchema}])],
  providers: [CashAdvanceCategoryService],
  controllers: [CashAdvanceCategoryController],
  exports: [],
})
export class CashAdvanceCategoryModule {}
