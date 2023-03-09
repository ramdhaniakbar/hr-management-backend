import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { AssetSchema } from './asset.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "Asset",schema: AssetSchema}])],
  providers: [AssetService],
  controllers: [AssetController]
})
export class AssetModule {}
