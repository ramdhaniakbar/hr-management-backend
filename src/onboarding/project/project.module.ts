import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectSchema } from './project.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "Project",schema: ProjectSchema}])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
