import { Module } from '@nestjs/common';
import { EmployeeEducationAndExperienceService } from './employee-education-and-experience.service';
import { EmployeeEducationAndExperienceController } from './employee-education-and-experience.controller';
import { EmployeeEducationAndExperienceSchema } from './employee-education-and-experience.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: "EmployeeEducationAndExperience",schema: EmployeeEducationAndExperienceSchema}])],
  providers: [EmployeeEducationAndExperienceService],
  controllers: [EmployeeEducationAndExperienceController]
})
export class EmployeeEducationAndExperienceModule {}
