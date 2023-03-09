import {
  Controller,
  Body,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { OnboardingSettingService } from './onboarding-setting.service';

@UseGuards(JwtAuthGuard)
@Controller('onboarding-setting')
export class OnboardingSettingController {
  constructor(
    private readonly onboardingSettingService: OnboardingSettingService,
  ) {}

  @Post()
  async createOnboardingSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() onboardingSetting: any,
  ) {
    const result = await this.onboardingSettingService.createOnboardingSetting(
      user,
      onboardingSetting,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get(':id')
  async getOnboardingSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.onboardingSettingService.findOnboardingSetting(
      id,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get()
  async getAllOnboardingSetting(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.onboardingSettingService.findAllOnboardingSetting(
      user,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Patch()
  async editOnboardingSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() update: any,
  ) {
    const result = await this.onboardingSettingService.updateOnboardingSetting(
      update,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Delete()
  async deleteOnboardingSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() id: any,
  ) {
    const result = await this.onboardingSettingService.deleteOnboardingSetting(
      id,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }
}
