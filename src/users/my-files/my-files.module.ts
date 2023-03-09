import { Module } from '@nestjs/common';
import { MyFilesService } from './my-files.service';
import { MyFilesController } from './my-files.controller';
import { MyFileSchemas } from './my-files.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "MyFiles",schema: MyFileSchemas}])],
  providers: [MyFilesService],
  controllers: [MyFilesController]
})
export class MyFilesModule {}
