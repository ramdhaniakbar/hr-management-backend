import { Module } from '@nestjs/common';
import { BreakTypeService } from './break-type.service';
import { BreakTypeController } from './break-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BreakTypeSchema } from './break-type.model';

@Module({
  imports:[MongooseModule.forFeature([{name: "BreakType",schema: BreakTypeSchema}])],
  providers: [BreakTypeService],
  controllers: [BreakTypeController]
})
export class BreakTypeModule {}
