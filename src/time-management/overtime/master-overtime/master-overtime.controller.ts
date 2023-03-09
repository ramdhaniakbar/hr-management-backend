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
import { masterOvertimeDto } from './dto/master-overtime.dto';
import { MasterOvertimeService } from './master-overtime.service';

@UseGuards(JwtAuthGuard)
@Controller('master-overtime')
export class MasterOvertimeController {
  constructor(private readonly masterOvertimeService: MasterOvertimeService) {}

  @Post()
  async createMasterOvertime(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() masterOvertime: masterOvertimeDto,
  ) {
    const result = await this.masterOvertimeService.createMasterOvertime(
      user,
      masterOvertime,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get()
  async getAllMasterOvertime(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.masterOvertimeService.findAllMasterOvertime(user);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get(':id')
  async getMasterOvertime(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.masterOvertimeService.findOneMasterOvertime(
      user,
      id,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Patch()
  async editMasterOvertime(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() edit: masterOvertimeDto,
  ) {
    const result = await this.masterOvertimeService.updateOneMasterOvertime(
      user,
      edit,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Delete(':id')
  async deleteMasterOvertime(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.masterOvertimeService.deleteOneMasterOvertime(
      user,
      id,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }
}
