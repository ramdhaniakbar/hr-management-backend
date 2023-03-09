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
import { CustomOvertimeDefaultService } from './custom-overtime-default.service';
import { customOvertimeDefaultDto } from './dto/customOvertimeDefault.dto';

@UseGuards(JwtAuthGuard)
@Controller('custom-overtime-default')
export class CustomOvertimeDefaultController {
  constructor(
    private customOvertimeDefaultService: CustomOvertimeDefaultService,
  ) {}

  @Post()
  async createCustomOvertimeDefault(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() customOvertimeDefault: customOvertimeDefaultDto,
  ) {
    const result =
      await this.customOvertimeDefaultService.createCustomOvertimeDefault(
        user,
        customOvertimeDefault,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Delete(':id')
  async deleteCustomOvertimeDefault(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.customOvertimeDefaultService.deleteOneCustomOvertimeDefault(
        user,
        id,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get(':id')
  async getCustomOvertimeDefault(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.customOvertimeDefaultService.findOneCustomOvertimeDefault(
        user,
        id,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get()
  async getAllCustomOvertimeDefault(
    @UserDoc() user: any,
    @Res() res: Response,
  ) {
    const result =
      await this.customOvertimeDefaultService.findAllCustomOvertimeDefault(
        user,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Patch()
  async editCustomOvertimeDefault(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() edit: customOvertimeDefaultDto,
  ) {
    const result =
      await this.customOvertimeDefaultService.updateOneCustomOvertimeDefault(
        user,
        edit,
      );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }
}
