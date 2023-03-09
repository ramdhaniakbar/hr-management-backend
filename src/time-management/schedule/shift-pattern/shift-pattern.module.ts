import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShiftDetailTypeModule } from '../shift-detail-type/shift-detail-type.module';
import { ShiftPatternController } from './shift-pattern.controller';
import { ShiftPatternSchema } from './shift-pattern.model';
import { ShiftPatternService } from './shift-pattern.service';

@Module({
  imports:[MongooseModule.forFeature([{name: "ShiftPattern",schema: ShiftPatternSchema}]), ShiftDetailTypeModule],
  controllers: [ShiftPatternController],
  providers: [ShiftPatternService],
  exports: [ShiftPatternService]
})
export class ShiftPatternModule {}
