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
  ParseArrayPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { overtimeDefaultDto } from './dto/overtime-default.dto';
import { OvertimeDefaultService } from './overtime-default.service';

@UseGuards(JwtAuthGuard)
@Controller('overtime-default')
export class OvertimeDefaultController {
  constructor(
    private readonly overtimeDefaultService: OvertimeDefaultService,
  ) {}
  @Post()
  async createOvertimeDefault(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() overtimeDefault: any,
  ) {
    const result = await this.overtimeDefaultService.createOvertimeDefault(
      user,
      overtimeDefault,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  // @Delete(':id')
  // async deleteOvertimeDefault(
  //   @UserDoc() user: any,
  //   @Res() res: Response,
  //   @Param('id', new ValidateObjectId()) id: any,
  // ) {
  //   const result = await this.overtimeDefaultService.deleteOvertimeDefault(
  //     user,
  //     id,
  //   );
  //   return res.status(HttpStatus.OK).json({
  //     message: result,
  //   });
  // }

  // @Get(':id')
  // async getOvertimeDefault(
  //   @UserDoc() user: any,
  //   @Res() res: Response,
  //   @Param('id', new ValidateObjectId()) id: any,
  // ) {
  //   const result = await this.overtimeDefaultService.findOneOvertimeDefault(
  //     user,
  //     id,
  //   );
  //   return res.status(HttpStatus.OK).json({
  //     message: result,
  //   });
  // }

  @Get()
  async getAllOvertimeDefault(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.overtimeDefaultService.findAllOvertimeDefault(
      user,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Patch()
  async editOvertimeDefault(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() edit: overtimeDefaultDto,
  ) {
    const result = await this.overtimeDefaultService.updateOvertimeDefault(
      user,
      edit,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }
}
