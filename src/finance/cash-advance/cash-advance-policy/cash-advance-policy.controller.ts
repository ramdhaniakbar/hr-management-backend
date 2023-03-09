import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { cashAdvancePolicyDto } from './dto';
import { CashAdvancePolicyService } from './cash-advance-policy.service';

@UseGuards(JwtAuthGuard)
@Controller('cash-advance-policy')
export class CashAdvancePolicyController {
  constructor(private cashAdvancePolicyService: CashAdvancePolicyService) {}

  @Post()
  async createcashAdvancePolicy(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() cashAdvancePolicy: cashAdvancePolicyDto,
  ) {
    const result = await this.cashAdvancePolicyService.createcashAdvancePolicy(
      user,
      cashAdvancePolicy,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Delete(':id')
  async deletecashAdvancePolicy(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result =
      await this.cashAdvancePolicyService.deleteOnecashAdvancePolicy(user, id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get(':id')
  async getOnecashAdvancePolicy(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.cashAdvancePolicyService.findOnecashAdvancePolicy(
      user,
      id,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get()
  async getAllcashAdvancePolicy(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.cashAdvancePolicyService.findAllcashAdvancePolicy(
      user,
    );
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Patch(':id')
  async updateCashAdvancePolicy(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() edit: cashAdvancePolicyDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.cashAdvancePolicyService.updateCashAdvancePolicy(
      user,
      edit,
      id,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }
}
