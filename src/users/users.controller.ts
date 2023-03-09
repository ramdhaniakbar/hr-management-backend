import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Patch,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  createParamDecorator,
  ExecutionContext,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ForbiddenException,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Express } from 'express';
import { checkAbility } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
import { AbilityGuard } from 'src/ability/ability.guard';
import { accountActivationAuthGuard, JwtAuthGuard } from 'src/auth/auth-guard/';
import { passwordDto } from 'src/company/dto';
import { profilePictOption } from 'src/utility/profile-pciture-multer-option';
import { UserDoc } from './custom-decorator';
import { EmployeeDto, userProfile } from './dto';
import { EmploymentDto } from './dto/employment.dto';
import { ValidateObjectId } from './pipes/validate-object-id.pipe';
import { UserService } from './users.service';

@Controller('users')
export class userController {
  constructor(private readonly userService: UserService) {}

  //can only be used by admin or superadmin
  //membuat dto untuk addemployee
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Create, subject: 'users' })
  @Post('employee')
  async addEmployee(@UserDoc() user: any, @Body() employee: EmployeeDto) {
    const newEmployee = await this.userService.addEmployee(employee, user);
    // .addEmployee(body, user)
    return newEmployee;

    // const test = await this.userService.test(body)
    // return test;
  }

  @UseGuards(
    JwtAuthGuard,
    // ,AbilityGuard
  )
  // @checkAbility({action: Action.Create, subject: "users/myprofile"})
  @Get('myprofile')
  async getProfile(@UserDoc() userDoc: any, @Request() req: any) {
    console.log('a');
    var local = req.get('host');
    console.log(1);
    const user = (await this.userService.findUserById(userDoc)).toObject();
    console.log(2);
    delete user.password;
    if (user.company.companyLogo) {
      user.company.companyLogo = 'http://' + local + user.company.companyLogo;
    }
    user.profilePict = 'http://' + local + user.profilePict;
    return user;
  }

  @UseGuards(JwtAuthGuard, AbilityGuard)
  @checkAbility({ action: Action.Request, subject: 'users/test' })
  @Get('test')
  async testP(@UserDoc() user: any) {
    return user;
  }

  @Get('AllUser')
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return users;
  }

  @Delete('deleteUser')
  async deleteUser(@Res() res: Response, @Body() id: any) {
    const deleteUser = await this.userService.deleteUser(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'user deleted: ', user: deleteUser });
  }

  @UseGuards(accountActivationAuthGuard)
  @Patch('activate-account')
  async activateAccount(
    @Res() res: Response,
    @UserDoc() user: any,
    @Body() password: passwordDto,
  ) {
    const result = await this.userService.activateUser(user, password);
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard-statistics')
  async getDashboardStatistic(@UserDoc() user: any) {
    console.log('ada');
    const result = await this.userService.getDashBoardStats(user);
    return result;
  }

  //profile pict cuma bisa diedit oleh usernya sendiri karena ketika edit profile pict menggunakan id user yg send request untuk fileNamenya
  @UseGuards(JwtAuthGuard)
  @Post('update-profile-picture')
  @UseInterceptors(FileInterceptor('profilePict', profilePictOption))
  async updateMyProfile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'jpeg|png|jpg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
    @UserDoc() user: any,
  ) {
    var profilePict = file.path;
    const result = await this.userService.updateProfilePict(user, profilePict);
    return res.status(HttpStatus.OK).json({
      result: result,
    });
  }
  @Get(':email')
  async getPosts(@Res() res: Response, @Param('email') email: string) {
    const user = await this.userService.signIn(email);
    if (!user) {
      throw new NotFoundException('no valid user found');
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-employment-data')
  async updateEmploymentData(
    @UserDoc() user: any,
    @Res() res: Response,
    @Body() employeeDto: EmploymentDto,
  ) {
    const empData = await this.userService.updateEmploymentData(
      user,
      employeeDto,
    );
    return res.status(HttpStatus.OK).json({
      result: empData,
    });
  }
}
