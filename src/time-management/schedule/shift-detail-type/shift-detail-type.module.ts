import { Module } from '@nestjs/common';
import { ShiftDetailTypeService } from './shift-detail-type.service';
import { ShiftDetailTypeController } from './shift-detail-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShiftDetailTypeSchema } from './shift-detail-type.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "ShiftDetailType",schema: ShiftDetailTypeSchema}])],
  providers: [ShiftDetailTypeService],
  controllers: [ShiftDetailTypeController],
  exports: [ShiftDetailTypeService]
})
export class ShiftDetailTypeModule {}
