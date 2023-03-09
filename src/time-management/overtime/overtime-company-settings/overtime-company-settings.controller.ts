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
import { overtimeCompanySettingsDto } from './dto/overtime.company.settings.dto';
import { OvertimeCompanySettingsService } from './overtime-company-settings.service';

@UseGuards(JwtAuthGuard)
@Controller('overtime-company-settings')
export class OvertimeCompanySettingsController {
  constructor(
    private overtimeCompanySettingsService: OvertimeCompanySettingsService,
  ) {}

  @Post()
  async createOvertimeCompanySettings(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() overtimeCompanySettings: overtimeCompanySettingsDto,
  ) {
    const result =
      await this.overtimeCompanySettingsService.createOvertimeCompanySettings(
        user,
        overtimeCompanySettings,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  // @Delete(':id')
  // async deleteOvertimeCompanySettings(
  //   @UserDoc() user: any,
  //   @Res() res: Response,
  //   @Param('id', new ValidateObjectId()) id: any,
  // ) {
  //   const result =
  //     await this.overtimeCompanySettingsService.deleteOneOvertimeCompanySettings(
  //       user,
  //       id,
  //     );
  //   return res.status(HttpStatus.OK).json({
  //     message: result,
  //   });
  // }

  // @Get(':id')
  // async getOvertimeCompanySettings(
  //   @UserDoc() user: any,
  //   @Res() res: Response,
  //   @Param('id', new ValidateObjectId()) id: any,
  // ) {
  //   const result =
  //     await this.overtimeCompanySettingsService.findOneOvertimeCompanySettings(
  //       user,
  //       id,
  //     );
  //   return res.status(HttpStatus.OK).json({
  //     message: result,
  //   });
  // }

  @Get()
  async getAllOvertimeCompanySettings(
    @UserDoc() user: any,
    @Res() res: Response,
  ) {
    const result =
      await this.overtimeCompanySettingsService.findAllOvertimeCompanySettings(
        user,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Patch()
  async editOvertimeCompanySettings(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() edit: any,
  ) {
    const result =
      await this.overtimeCompanySettingsService.updateOneOvertimeCompanySettings(
        user,
        edit,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }
}
