import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  ForbiddenException,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CompanyAuthGuard, JwtAuthGuard } from 'src/auth/auth-guard';
import {
  ClassDto,
  companyDto,
  CustomFieldDto,
  EventDto,
  GradeDto,
  NppBpjsKetenagakerjaanDto,
  OrgDto,
  passwordDto,
  UpdateEmployeeStatusDto,
} from './dto';
import { CompanyService } from './company.service';
import { SuperadminDto } from './dto';
import { AbilityGuard } from 'src/ability/ability.guard';
import { checkAbility } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
import { EmployeeStatusDto } from './dto/employee-status.dto';
import { UserDoc } from 'src/users/custom-decorator';
import { ValidateObjectId } from 'src/users/pipes/validate-object-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { profilePictOption } from 'src/utility/profile-pciture-multer-option';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(CompanyAuthGuard)
  @Post('update-profile-picture')
  @UseInterceptors(FileInterceptor("companyLogo", profilePictOption))
  async updateCompanyProfilePicture(@UploadedFile(
    new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({maxSize: 5000000}),
            new FileTypeValidator({fileType: 'jpeg|png|jpg'})
        ]
    })
) file: Express.Multer.File,@UserDoc() user: any, @Res()res:Response) {
    var profilePict = file.path
    const result = await this.companyService.updateCompanyProfilePict(user,profilePict);
    return res.status(HttpStatus.OK).json({
      result: result
    })
  }

  @UseGuards(CompanyAuthGuard)
  @Get('myprofile')
  async getCompanyProfile(@UserDoc() user: any,@Request() req:any) {
    var local = req.get('host')
    let company = (await this.companyService.findCompanyById(user)).toObject();
    delete company.password
    company.companyLogo = "http://"+local+company.companyLogo
    return company;
  }

  @UseGuards(CompanyAuthGuard)
  @Post('addSuper')
  async addSuperAdmin(
    @UserDoc() company: any,
    @Res() res: Response,
    @Body() superadminDto: SuperadminDto,
  ) {
    const newSuper = await this.companyService.addSuper(superadminDto, company);
    return res.status(HttpStatus.OK).json({
      message: 'Super Admin is Created',
    });
  }

  @UseGuards(CompanyAuthGuard)
  @Post('verifypassword')
  async verifyPassword(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() pass: passwordDto,
  ) {
    const verify = await this.companyService.verifyPassword(pass, user);
    if (verify) {
      return res.status(HttpStatus.OK).json({
        message: 'password is verified',
      });
    } else {
      throw new ForbiddenException('the password does not match');
    }
  }

  @UseGuards(CompanyAuthGuard)
  @Patch('changepassword')
  async changePassword(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() pass: passwordDto,
  ) {
    const changed = await this.companyService.changePassword(pass, user);
    if (changed) {
      return res.status(HttpStatus.OK).json({
        message: 'password is changed',
      });
    }
  }

  @UseGuards(CompanyAuthGuard)
  @Put('updatecompany')
  async updatComp(
    @UserDoc() company: any,
    @Res() res: Response,
    @Body() compDto: companyDto,
  ) {
    const updatedCompany = await this.companyService.updateCompany(
      compDto,
      company,
    );
    if (updatedCompany.acknowledged === true) {
      return res.status(HttpStatus.OK).json({
        message: 'company data has been updated succesfully',
      });
    }
    return res.status(HttpStatus.NOT_IMPLEMENTED).json({
      message: 'failed to update company data',
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Create, subject: 'company/organization' })
  @Post('organization')
  async addOrganization(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() orgDto: OrgDto,
  ) {
    const result = await this.companyService.addOrganization(orgDto, user);
    // if(result.acknowledged == true){

    return res.status(HttpStatus.OK).json({
      message: result,
    });
    // }

    // return res.status(HttpStatus.NOT_IMPLEMENTED).json({
    //     message: "failed to add organization"
    // })
  }

  @UseGuards(JwtAuthGuard)
  @checkAbility({ action: Action.Read, subject: 'company/organization' })
  @Get('organization')
  async viewOrganization(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.companyService.findOrg(user);
    return res.status(HttpStatus.OK).json({
      message: 'success',
      organization: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Delete, subject: 'company/organization' })
  @Delete('organization')
  async deleteOrganization(@Res() res: Response, @Body() deleteOrg: any) {
    const result = await this.companyService.deleteOrg(deleteOrg);
    return res.status(HttpStatus.OK).json({
      message: 'success',
      delete: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Update, subject: 'company/organization' })
  @Patch('organization')
  async editOrganization(@Res() res: Response, @Body() updateOrg: any) {
    const result = await this.companyService.updateOrg(updateOrg);
    return res.status(HttpStatus.OK).json({
      message: 'success',
      update: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Create, subject: 'company/job-level' })
  @Post('job-level')
  async addJobLevel(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() jobLevel: any,
  ) {
    const result = await this.companyService.addJobLevel(user, jobLevel);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/job-level' })
  @Get('job-level')
  async findJobLevel(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.companyService.findJobLevel(user);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Delete, subject: 'company/job-level' })
  @Delete('job-level')
  async deleteJobLevel(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() jobLevel: any,
  ) {
    const result = await this.companyService.deleteJobLevel(user, jobLevel);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Update, subject: 'company/job-level' })
  @Patch('job-level')
  async editJobLevel(@Res() res: Response, @Body() jobLevel: any) {
    const result = await this.companyService.updateJobLevel(jobLevel);
    if (result.acknowledged == true) {
      return res.status(HttpStatus.OK).json({
        message: result,
      });
    }
    return res.status(HttpStatus.NOT_IMPLEMENTED).json({
      message: 'failed to edit job level',
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Create, subject: 'company/employment-status' })
  @Post('employment-status')
  async addEmploymentStatus(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() employmentStatus: EmployeeStatusDto,
  ) {
    const result = await this.companyService.addEmploymentStatus(
      employmentStatus,
      user,
    );

    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/employment-status' })
  @Get('employment-status')
  async viewEmploymentStatus(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.companyService.findEmploymentStatus(user);
    if (!result) {
      return res.status(HttpStatus.OK).json({
        message: 'there is no employee status in this company',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'succesfully found emploment status in company',
      employmentStatus: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Update, subject: 'company/employment-status' })
  @Patch('employment-status')
  async updateEmploymentStatus(
    @Res() res: Response,
    @Body() empStatus: UpdateEmployeeStatusDto,
  ) {
    const result = await this.companyService.updateEmploymentStatus(empStatus);
    if (result.acknowledged == true) {
      return res.status(HttpStatus.OK).json({
        message: result,
      });
    }
    return res.status(HttpStatus.NOT_IMPLEMENTED).json({
      message: 'failed to edit employee status',
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Delete, subject: 'company/employment-status' })
  @Delete('employment-status')
  async deleteEmploymentStatus(@Res() res: Response, @Body() empStatus: any) {
    const result = await this.companyService.deleteEmploymentStatus(empStatus);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  //class
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Create, subject: 'company/class' })
  @Post('class')
  async addClass(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() classDto: ClassDto,
  ) {
    const result = await this.companyService.addClass(user, classDto);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/class' })
  @Get('class/:id')
  async viewClass(
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.companyService.findClass(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/class' })
  @Get('class')
  async viewAllClass(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.companyService.findAllClass(user);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Update, subject: 'company/class' })
  @Patch('class')
  async updateClass(@Res() res: Response, @Body() update: any) {
    const result = await this.companyService.updateClass(update);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Delete, subject: 'company/class' })
  @Delete('class')
  async deleteClass(@Res() res: Response, @Body() id: any) {
    const result = await this.companyService.deletedClass(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  //custom - field
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Create, subject: 'company/custom-field' })
  @Post('custom-field')
  async addCustomField(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() customField: CustomFieldDto,
  ) {
    const result = await this.companyService.addCustomField(user, customField);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/custom-field' })
  @Get('custom-field/:id')
  async viewCustomField(
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.companyService.findCustomField(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/custom-field' })
  @Get('custom-field')
  async viewAllCustomField(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.companyService.findAllCustomField(user);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Update, subject: 'company/custom-field' })
  @Patch('custom-field')
  async updateCustomField(@Res() res: Response, @Body() update: any) {
    const result = await this.companyService.updateCustomField(update);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Delete, subject: 'company/custom-field' })
  @Delete('custom-field')
  async deleteCustomField(@Res() res: Response, @Body() id: any) {
    const result = await this.companyService.deleteCustomField(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  //grade
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Create, subject: 'company/grade' })
  @Post('grade')
  async addGrade(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() grade: GradeDto,
  ) {
    const result = await this.companyService.addGrade(user, grade);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/grade' })
  @Get('grade/:id')
  async viewGrade(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.companyService.findGrade(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/grade' })
  @Get('grade')
  async viewAllGrade(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.companyService.findAllGrade(user);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Update, subject: 'company/grade' })
  @Patch('grade')
  async updateGrade(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() update: any,
  ) {
    const result = await this.companyService.updateGrade(update);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Delete, subject: 'company/grade' })
  @Delete('grade')
  async deleteGrade(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() id: any,
  ) {
    const result = await this.companyService.deleteGrade(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  //event
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Create, subject: 'company/event' })
  @Post('event')
  async addEvent(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() event: EventDto,
  ) {
    const result = await this.companyService.addEvent(user, event);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/class' })
  @Get('event/:id')
  async viewEvent(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.companyService.findEvent(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Read, subject: 'company/event' })
  @Get('event')
  async viewAllEvent(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.companyService.findAllEvent(user);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Update, subject: 'company/class' })
  @Patch('event')
  async updateEvent(@Res() res: Response, @Body() update: any) {
    const result = await this.companyService.updateEvent(update);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Delete, subject: 'company/class' })
  @Delete('event')
  async deleteEvent(@Res() res: Response, @Body() id: any) {
    const result = await this.companyService.deleteEvent(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  //npp-bpjs
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({
    action: Action.Create,
    subject: 'company/npp-bpjs-ketenagakerjaan',
  })
  @Post('npp-bpjs-ketenagakerjaan')
  async addNpp(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() npp: NppBpjsKetenagakerjaanDto,
  ) {
    const result = await this.companyService.addNpp(user, npp);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({
    action: Action.Read,
    subject: 'company/npp-bpjs-ketenagakerjaan',
  })
  @Get('npp-bpjs-ketenagakerjaan/:id')
  async viewNpp(
    @UserDoc() user: any,
    @Res() res: Response,
    @Param('id', new ValidateObjectId()) id: any,
  ) {
    const result = await this.companyService.findNpp(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({
    action: Action.Read,
    subject: 'company/npp-bpjs-ketenagakerjaan',
  })
  @Get('npp-bpjs-ketenagakerjaan')
  async viewAllNpp(@UserDoc() user: any, @Res() res: Response) {
    const result = await this.companyService.findAllNpp(user);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({
    action: Action.Update,
    subject: 'company/npp-bpjs-ketenagakerjaan',
  })
  @Patch('npp-bpjs-ketenagakerjaan')
  async updateNpp(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() update: any,
  ) {
    const result = await this.companyService.updateNpp(update);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({
    action: Action.Delete,
    subject: 'company/npp-bpjs-ketenagakerjaan',
  })
  @Delete('npp-bpjs-ketenagakerjaan')
  async deleteNpp(@UserDoc() user: any, @Res() res: Response, @Body() id: any) {
    const result = await this.companyService.deleteNpp(id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }
}
