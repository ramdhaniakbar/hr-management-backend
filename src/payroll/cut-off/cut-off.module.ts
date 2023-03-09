import { Module } from '@nestjs/common';
import { CutOffService } from './cut-off.service';
import { CutOffController } from './cut-off.controller';
import { CutOffSchema } from './cut-off.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AbilityModule } from 'src/ability/ability.module';
import { AccessModule } from 'src/access/access.module';

@Module({
  imports:[MongooseModule.forFeature([{name: "CutOff",schema: CutOffSchema}]), AbilityModule, AccessModule],
  providers: [CutOffService],
  controllers: [CutOffController]
})
export class CutOffModule {}
