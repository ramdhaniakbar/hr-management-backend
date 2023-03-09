import { Module } from '@nestjs/common';
import { OnboardingSettingService } from './onboarding-setting.service';
import { OnboardingSettingController } from './onboarding-setting.controller';
import { OnboardingSettingSchema } from './onboarding-setting.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { TaskForNewEmployeeModule } from '../task-for-new-employee/task-for-new-employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OnboardingSetting', schema: OnboardingSettingSchema },
    ]),
    CompanyModule,
    TaskForNewEmployeeModule,
  ],
  providers: [OnboardingSettingService],
  controllers: [OnboardingSettingController],
})
export class OnboardingSettingModule {}
