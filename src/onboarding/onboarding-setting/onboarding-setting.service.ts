import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { TaskForNewEmployeeService } from '../task-for-new-employee/task-for-new-employee.service';
import { onboardingSettingDto } from './dto/onboarding-setting.dto';
import { OnboardingSetting } from './onboarding-setting.model';

@Injectable()
export class OnboardingSettingService {
  constructor(
    @InjectModel('OnboardingSetting')
    private readonly onboardingSettingModel: Model<OnboardingSetting>,
    private readonly companyService: CompanyService,
    private readonly taskForNewEmployeeService: TaskForNewEmployeeService,
  ) {}

  async createOnboardingSetting(
    user: any,
    onboardingSetting: onboardingSettingDto,
  ) {
    await this.companyService.findOneJobLevel(onboardingSetting.jobLevel);
    await this.companyService.findOneOrg(onboardingSetting.organization);

    let taskInviter = onboardingSetting.taskForInviter;
    for (let index = 0; index < taskInviter.length; index++) {
      await this.taskForNewEmployeeService.checkTask(
        taskInviter[index].task,
        true,
      );
    }

    let taskEmployee = onboardingSetting.taskForNewEmployee;
    for (let index = 0; index < taskEmployee.length; index++) {
      await this.taskForNewEmployeeService.checkTask(
        taskEmployee[index].task,
        false,
      );
    }

    const addOnboardingSetting = new this.onboardingSettingModel({
      company: user.company,
      settingName: onboardingSetting.settingName,
      jobLevel: onboardingSetting.jobLevel,
      workLocation: onboardingSetting.workLocation,
      instruction: onboardingSetting.instruction,
      selectOnMap: onboardingSetting.selectOnMap,
      taskForInviter: onboardingSetting.taskForInviter,
      taskForNewEmployee: onboardingSetting.taskForNewEmployee,
      organization: onboardingSetting.organization,
      createdBy: user.sub,
    });
    await addOnboardingSetting.save();
    return addOnboardingSetting;
  }

  async findOnboardingSetting(id: any) {
    const findOnboardingSetting = await this.onboardingSettingModel.findById(
      id,
    );
    if (!findOnboardingSetting) {
      throw new NotFoundException(
        'no on boarding setting found with id: ' + id,
      );
    }
    let result = findOnboardingSetting.toObject();
    result.createdAt = result.createdAt.toLocaleString();
    return result;
  }

  async findAllOnboardingSetting(user: any) {
    const findAllOnboardingSetting = await this.onboardingSettingModel
      .find({ company: user.company })
      .exec();

    if (!findAllOnboardingSetting) {
      throw new NotFoundException(
        'no on boarding setting found with your company id',
      );
    }

    let result = findAllOnboardingSetting.map((i) => {
      return i.toObject();
    });

    result.map((i) => {
      i.createdAt = i.createdAt.toLocaleString();
    });

    return result;
  }

  async updateOnboardingSetting(update: any) {
    await this.findOnboardingSetting(update._id);
    const updateOnboardingSetting = await this.onboardingSettingModel.updateOne(
      { _id: update._id },
      {
        $set: {
          settingName: update.settingName,
          jobLevel: update.jobLevel,
          workLocation: update.workLocation,
          instruction: update.instruction,
          selectOnMap: update.selectOnMap,
          taskForInviter: update.taskForNewEmployee,
          taskForNewEmployee: update.taskForNewEmployee,
          organization: update.organization,
        },
      },
    );
    return updateOnboardingSetting;
  }

  async deleteOnboardingSetting(id: any) {
    await this.findOnboardingSetting(id._id);
    const deleteOnboardingSetting = await this.onboardingSettingModel.deleteOne(
      {
        _id: id._id,
      },
    );
    return deleteOnboardingSetting;
  }
}
