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
import { thrSettingDto } from './dto';
import { ThrSettingService } from './thr-setting.service';

@UseGuards(JwtAuthGuard)
@Controller('thr-setting')
export class ThrSettingController {
  constructor(private thrSettingService: ThrSettingService) {}

  @Post()
  async createThrSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() thrSetting: thrSettingDto,
  ) {
    const result = await this.thrSettingService.createThrSetting(
      user,
      thrSetting,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  // @Delete()
  // async deleteThrSetting(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
  //     return res.status(HttpStatus.OK).json({
  //         message: 'Delete Thr Setting'
  //     })
  // }

  // @Get(':id')
  // async getThrSetting(
  //   @UserDoc() user: any,
  //   @Res() res: Response,
  //   @Param('id', new ValidateObjectId()) id: any,
  // ) {
  //   const result = await this.thrSettingService.findOneThrSetting(user, id);
  //   return res.status(HttpStatus.OK).json({
  //     message: result,
  //   });
  // }

  @Get()
  async getAllThrSetting(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.thrSettingService.findAllThrSetting(user);
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @Patch(':id')
  async editThrSetting(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() edit: thrSettingDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.thrSettingService.updateThrSetting(
      user,
      edit,
      id,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }
}
