import { Module } from '@nestjs/common';
import { BorrowAssetsService } from './borrow-asset.service';
import { BorrowAssetController } from './borrow-asset.controller';
import { BorrowAssetSchema } from './borrow-asset.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "BorrowAsset",schema: BorrowAssetSchema}])],
  providers: [BorrowAssetsService],
  controllers: [BorrowAssetController]
})
export class BorrowAssetModule {}
