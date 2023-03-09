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
import { ValidateObjectId } from '../pipes/validate-object-id.pipe';
import { PersonalDataDto } from './dto';
import { FamilyDto } from './dto/family.dto';
import { IdFamilyDto } from './dto/id-family.dto';
import { IdentityAddressDto } from './dto/identity-address.dto';
import { EmployeePersonalDataService } from './employee-personal-data.service';

@UseGuards(JwtAuthGuard)
@Controller('employee-personal-data')
export class EmployeePersonalDataController {
  constructor(
    private employeePersonalDataService: EmployeePersonalDataService,
  ) {}

  @Post()
  async createEmployeePersonalData(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() employeePersonalData: any,
  ) {
    return res.status(HttpStatus.OK).json({
      message: 'Post Employee Personal Data',
    });
  }

  // @Delete()
  // async deleteEmployeePersonalData(@UserDoc() user: any ,@Res() res:Response, @Body() id:any){
  //     return res.status(HttpStatus.OK).json({
  //         message: 'Delete Employee Personal Data'
  //     })
  // }

  // @Get(":id")
  // async getEmployeePersonalData(@UserDoc() user: any ,@Res() res:Response, @Param('id') id: any){
  //     return res.status(HttpStatus.OK).json({
  //         message:'Get Employee Personal Data'
  //     })
  // }

  @Get()
  async getEmployeePersonalData(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.employeePersonalDataService.findPersonalInfo(
      user,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  // @Get()
  // async getAllEmployeePersonalData(@UserDoc() user: any ,@Res() res:Response){
  //     return res.status(HttpStatus.OK).json({
  //         message:'Get All Employee Personal Data in company'
  //     })
  // }

  @Patch()
  async editEmployeePersonalData(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() edit: any,
  ) {
    return res.status(HttpStatus.OK).json({
      message: 'Patch Employee Personal Data',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('personal-data/:id')
  async editUserPersonalData(
    @Res() res: Response,
    @UserDoc() user: any,
    @Body() personalData: PersonalDataDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.employeePersonalDataService.editPersonalData(
      user,
      id,
      personalData,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('basic-info/:id')
  async getUserBasicInfo(
    @Res() res: Response,
    @UserDoc() user: any,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.employeePersonalDataService.findBasicInfoById(
      user,
      id,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('identity-address/:id')
  async editUserIdentityAddress(
    @Res() res: Response,
    @UserDoc() user: any,
    @Body() identityAddress: IdentityAddressDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.employeePersonalDataService.editIdentityAddress(
      user,
      id,
      identityAddress,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('add-family/:id')
  async addFamily(
    @Res() res: Response,
    @UserDoc() user: any,
    @Body() familyDto: FamilyDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.employeePersonalDataService.addFamily(
      user,
      id,
      familyDto,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit-family/:id')
  async editFamily(
    @Res() res: Response,
    @UserDoc() user: any,
    @Body() familyDto: IdFamilyDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.employeePersonalDataService.editFamily(
      user,
      id,
      familyDto,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('delete-family/:id')
  async deleteFamily(
    @Res() res: Response,
    @UserDoc() user: any,
    @Body() familyDto: IdFamilyDto,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.employeePersonalDataService.deleteFamily(
      user,
      id,
      familyDto,
    );
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }
}
