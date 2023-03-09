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
import { timeOffCompensationSettingDto } from './dto/time-off-compensation-setting.dto';
import { TimeOffCompensationSettingService } from './time-off-compensation-setting.service';

@UseGuards(JwtAuthGuard)
@Controller('time-off-compensation-setting')
export class TimeOffCompensationSettingController {
  constructor(
    private timeOffCompensationSettingService: TimeOffCompensationSettingService,
  ) {}

  @Post()
  async createTimeOffCompensationSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() timeOffCompensationSetting: timeOffCompensationSettingDto,
  ) {
    const result =
      await this.timeOffCompensationSettingService.createTimeOffCompensationSetting(
        user,
        timeOffCompensationSetting,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Delete(':id')
  async deleteTimeOffCompensationSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.timeOffCompensationSettingService.deleteTimeOffCompensationSetting(
        user,
        id,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  // @Get(":id")
  // async getTimeOffCompensationSetting(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
  //     return res.status(HttpStatus.OK).json({
  //         message:'Get One Time Off Compensation Setting'
  //     })
  // }

  @Get()
  async getAllTimeOffCompensationSetting(
    @UserDoc() user: any,
    @Res() res: Response,
  ) {
    const result =
      await this.timeOffCompensationSettingService.findAllTimeOffCompensationSetting(
        user,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Patch(':id')
  async editTimeOffCompensationSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() edit: timeOffCompensationSettingDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.timeOffCompensationSettingService.updateTimeOffCompensationSetting(
        user,
        edit,
        id,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }
}
