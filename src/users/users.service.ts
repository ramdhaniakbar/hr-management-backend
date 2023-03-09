import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { passwordDto } from 'src/company/dto';
import {
  createdByTypes,
  defaultEmploymentStatus,
  idTypes,
  payrollScheduleModelTypes,
  prorateSettingTypes,
} from 'src/enum';
import { MasterTableService } from 'src/master-table/master-table.service';
import { PaymentScheduleService } from 'src/payroll/payment-schedule/payment-schedule.service';
import { PayrollScheduleService } from 'src/payroll/payroll-schedule/payroll-schedule.service';
import { ProRateSettingService } from 'src/payroll/pro-rate-setting/pro-rate-setting.service';
import { CustomOvertimeDefaultService } from 'src/time-management/overtime/custom-overtime-default/custom-overtime-default.service';
import { ScheduleService } from 'src/time-management/schedule/schedule/schedule.service';
import { EmployeeDto } from './dto';
import { EmployeePayrollService } from './employee-payroll/employee-payroll.service';
import { EmployeePersonalDataService } from './employee-personal-data/employee-personal-data.service';
import { User } from './user.model';
import * as argon from 'argon2';
import { TimeOffBalanceService } from 'src/time-management/time-off/time-off-balance/time-off-balance.service';
import { EmploymentDto } from './dto/employment.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private companyService: CompanyService,
    private employeePayrollService: EmployeePayrollService,
    private employeePersonalDataService: EmployeePersonalDataService,
    private scheduleService: ScheduleService,
    private payrollScheduleService: PayrollScheduleService,
    private paymentScheduleService: PaymentScheduleService,
    private masterTableService: MasterTableService,
    private proRateSettingService: ProRateSettingService,
    private customOvertimeDefaultService: CustomOvertimeDefaultService,
    @Inject(forwardRef(() => TimeOffBalanceService))
    private timeOffBalanceService: TimeOffBalanceService,
  ) {}

  async getAllUser() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async signIn(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async getOneUserId(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new ForbiddenException('no user found with the id of ' + id);
    }
    return user;
  }

  async checkEmployeeUniqueField(employee: any, user: any) {
    //email, empId, dan barcode
    const checkEmployee = await this.userModel.findOne({
      company: user.company,
      $or: [
        { employeeId: employee.employmentData.employeeId },
        { barcode: employee.employmentData.barcode },
      ],
    });
    const checkEmail = await this.userModel.findOne({
      email: employee.personalData.email,
    });

    if (!checkEmployee && !checkEmail) {
      return employee;
    }
    if (checkEmail && checkEmail.email === employee.personalData.email) {
      throw new ForbiddenException(
        'email must be unique, the email ' +
          employee.personalData.email +
          ' is already taken',
      );
    }
    if (
      checkEmployee &&
      checkEmployee.employeeId === employee.employmentData.employeeId
    ) {
      throw new ForbiddenException(
        'employeeId must be unique, the employeeId ' +
          employee.employmentData.employeeId +
          ' is already in use',
      );
    }
    if (
      checkEmployee &&
      checkEmployee.barcode === employee.employmentData.barcode
    ) {
      throw new ForbiddenException(
        'barcode must be unique, the barcode ' +
          employee.employmentData.barcode +
          ' is already in use',
      );
    }

    return employee;
  }

  async checkEmail(email: any, id: any) {
    const checkEmail = await this.userModel.findOne({ email: email });
    if (checkEmail && checkEmail._id != id) {
      throw new ForbiddenException(
        'email must be unique, the email ' + email + ' is already taken',
      );
    }
  }

  async addEmployee(employee: EmployeeDto, user: any) {
    const i =
      // employee
      instanceToPlain(employee);

    //Employee personal data
    if (
      i.personalData.identityAddress.permanent == false &&
      !i.personalData.identityAddress.idExpirationDate
    ) {
      throw new ForbiddenException(
        'you must fill id expiration date if your id is not permanent',
      );
    }
    if (i.personalData.identityAddress.useAsResidentalAddress == true) {
      i.personalData.identityAddress.residentalAddress =
        i.personalData.identityAddress.citizenAddress;
    }

    //Employee employment data
    if (
      i.employmentData.employmentStatus === defaultEmploymentStatus.contract ||
      i.employmentData.employmentStatus === defaultEmploymentStatus.probation
    ) {
      if (!i.employmentData.endStatusDate) {
        throw new ForbiddenException(
          'employment status that is not permanent should have end status date',
        );
      }
    }
    if (!i.employmentData.grade && i.employmentData.class) {
      throw new ForbiddenException(
        'to pick a class you must have a grade that have a child class',
      );
    }
    //employee payroll data
    if (
      (i.payroll.prorateSettingDefault && i.payroll.prorateSetting) ||
      (!i.payroll.prorateSettingDefault && !i.payroll.prorateSetting)
    ) {
      throw new ForbiddenException(
        'there should either be prorateSettingDefault or prorateSetting',
      );
    }
    if (i.payroll.prorateSetting) {
      if (
        i.payroll.prorateSetting.prorateSetting ===
          prorateSettingTypes.basedOnWorkingDay ||
        i.payroll.prorateSetting.prorateSetting ===
          prorateSettingTypes.customOnWorkingDay
      ) {
        if (i.payroll.prorateSetting.countNationalHoliday == null) {
          throw new ForbiddenException(
            'prorate setting type with working day should have countNationalHoliday',
          );
        }
      }
      if (
        i.payroll.prorateSetting.prorateSetting ===
          prorateSettingTypes.customOnCalendarDay ||
        i.payroll.prorateSetting.prorateSetting ===
          prorateSettingTypes.customOnWorkingDay
      ) {
        if (i.payroll.prorateSetting.customNumber == null) {
          throw new ForbiddenException(
            'prorate setting type of custom should have customNumber',
          );
        }
      }
      if (
        i.payroll.prorateSetting.prorateSetting ===
          prorateSettingTypes.basedOnWorkingDay ||
        i.payroll.prorateSetting.prorateSetting ===
          prorateSettingTypes.basedOnCalendarDay
      ) {
        if (i.payroll.prorateSetting.customNumber != null) {
          throw new ForbiddenException(
            "prorate setting type of based on working day and calendar day shouldn't have customNumber",
          );
        }
      }

      if (
        i.payroll.prorateSetting.prorateSetting ===
          prorateSettingTypes.basedOnCalendarDay ||
        i.payroll.prorateSetting.prorateSetting ===
          prorateSettingTypes.customOnCalendarDay
      ) {
        if (i.payroll.prorateSetting.countNationalHoliday != null) {
          throw new ForbiddenException(
            "prorate setting type of based and custom on calendar day shouldn't have countNationalHoliday",
          );
        }
      }
    }

    //need to test if same email in different company would work and different company with the same barcode would work
    await this.checkEmployeeUniqueField(employee, user);
    //check exist employment status, job level, organization, grade, class,schedule, approval line
    //employmentData
    if (
      Object.values(defaultEmploymentStatus).includes(
        i.employmentData.employmentStatus,
      )
    ) {
      const defaultEmpStatus =
        await this.companyService.findDefaultEmploymentStatus(
          i.employmentData.employmentStatus,
        );
      i.employmentData.employmentStatus = defaultEmpStatus._id;
    } else {
      await this.companyService.findOneEmpStatus(
        i.employmentData.employmentStatus,
      );
    }

    await this.companyService.findOneJobLevel(i.employmentData.jobLevel);
    await this.companyService.findOneOrg(i.employmentData.organization);
    if (i.employmentData.grade) {
      await this.companyService.findGrade(i.employmentData.grade);
    }
    if (i.employmentData.class) {
      const checkClass = await this.companyService.findClass(
        i.employmentData.class,
      );
      if (checkClass.parent !== i.employmentData.grade) {
        throw new ForbiddenException(
          "the class must be the children of the grade you've selcted",
        );
      }
    }
    await this.scheduleService.findOneSchedule(user, i.employmentData.schedule);
    if (i.employmentData.approvalLine) {
      await this.findOneUser(i.employmentData.approvalLine);
    }

    //employeePayroll
    if (i.payroll.paymentSchedule === 'Default') {
      const defaultPaymentSchedule =
        await this.payrollScheduleService.findPayrollSchedule(user);
      i.payroll.paymentSchedule = defaultPaymentSchedule[0]._id;
      i.payroll.model_type = payrollScheduleModelTypes.payrollSchedule;
    } else {
      await this.paymentScheduleService.findOnePaymentSchedule(
        user,
        i.payroll.paymentSchedule,
      );
      i.payroll.model_type = payrollScheduleModelTypes.paymentSchedule;
    }
    if (i.payroll.bankName) {
      await this.masterTableService.findMasterBank(i.payroll.bankName);
    }
    if (i.payroll.nppBpjsKetenagakerjaan) {
      await this.companyService.findNpp(i.payroll.nppBpjsKetenagakerjaan);
      i.payroll.nppBpjsKetenagakerjaan = {
        currentNpp: i.payroll.nppBpjsKetenagakerjaan,
      };
    }
    if (i.payroll.prorateSettingDefault) {
      const defaultProrate =
        await this.proRateSettingService.findProrateSetting(user);
      i.payroll.prorateSettingDefault = defaultProrate[0]._id;
    }
    if (i.payroll.allowForOvertime == true) {
      //check if user job level and organization have custom overtime default if there is not then follow overtime default
      //perlu ditest jika filternya ada yg sama jadinya gmn
      const overtime =
        await this.customOvertimeDefaultService.findOvertimeDefaultByFilter(
          user,
          i.employmentData.organization,
          i.employmentData.jobLevel,
        );
      i.payroll.overtimeWorkingDefault = overtime.workingDay;
      i.payroll.overtimeDayOffDefault = overtime.dayOff;
      i.payroll.overtimeNationalHolidayDefault = overtime.nationalHoliday;
    }

    //merapikan data
    i.personalData.company = user.company;
    i.personalData.createdBy = user.sub;
    i.payroll.company = user.company;
    i.payroll.createdBy = user.sub;
    i.employmentData.company = user.company;
    i.employmentData.createdBy = user.sub;
    i.employmentData.schedule = { currentSchedule: i.employmentData.schedule };
    i.employmentData.model_type = createdByTypes.user;
    i.employmentData.email = i.personalData.email;
    delete i.personalData.email;
    i.employmentData.name = i.personalData.name;
    delete i.personalData.name;
    const employmentData = await this.createUser(i.employmentData);

    i.personalData.user = employmentData._id;
    i.payroll.user = employmentData._id;

    const personalData =
      await this.employeePersonalDataService.createEmployeePersonalData(
        i.personalData,
      );
    const payroll = await this.employeePayrollService.createEmployeePayroll(
      i.payroll,
    );
    const timeOffBalance =
      await this.timeOffBalanceService.createTimeOffBalance(employmentData);

    return { employmentData, personalData, payroll };
  }

  async createUser(user: any) {
    const result = await this.userModel.create(user);
    return result;
  }

  async findUserById(userDoc: any) {
    const user = await this.userModel.findById(userDoc.sub).populate('company');
    if (!user) {
      throw new NotFoundException('no user found with the id ' + userDoc.sub);
    }
    return user;
  }

  async findOneUser(id: any) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('no user found with the id ' + id);
    }
    return user;
  }

  async findArrUser(array: any) {
    for (let index = 0; index < array.length; index++) {
      let duplicate = array.filter((t) => t.user === array[index].user);
      if (duplicate.length > 1) {
        throw new ForbiddenException(
          'found duplicate user id of ' + array[index].user,
        );
      }
      await this.getOneUserId(array[index].user);
    }
    return array;
  }

  async test(x: any) {
    const user = await this.findUserById(x);
    const temp = await this.userModel
      .find({ email: user.email })
      .populate('company');
    return temp;
  }

  async deleteUser(id: any) {
    const deleteUser = await this.userModel.deleteOne({ _id: id });
    return deleteUser;
  }

  async findMultiUserById(users: any) {
    const result = await this.userModel.find({
      organization: {
        $in: users.map((i) => {
          return i.organization;
        }),
      },
    });

    return result;
  }

  async activateUser(user: any, passwordd: passwordDto) {
    const inactive = await this.userModel.findOne({
      $and: [{ _id: user._id }, { password: undefined }],
    });

    if (!inactive) {
      throw new NotFoundException('the account is already activated');
    }
    const hashedPassword = await argon.hash(passwordd.password);
    const result = await this.userModel.updateOne(
      { _id: user },
      {
        $set: {
          password: { password: hashedPassword, passwordChangedBy: user._id },
          activationDate: Date.now(),
        },
      },
    );
    return result;
  }

  async editPersonalData(id: any, personalData: any) {
    const editedPersonalData = await this.userModel.updateOne(
      { _id: id },
      { $set: { name: personalData.name, email: personalData.email } },
    );
    return editedPersonalData;
  }

  async updateProfilePict(user: any, filePath: string) {
    var newFilePath = filePath.replace('upload-file', '');
    const editProfilePict = await this.userModel.updateOne(
      { _id: user.sub },
      { $set: { profilePict: newFilePath } },
    );
    return editProfilePict;
  }

  async getDashBoardStats(user: any) {
    console.log(user.company);
    // const jobLevel = await this.userModel.aggregate([{$match:{company: user.company}},{$group:{_id:"$jobLevel", total:{$sum: 1}}}])
    const users = await this.userModel.find({ company: user.company });
    const result = {};

    users.map((i) => {
      if (i.jobLevel) {
      }
    });
    return result;
  }

  async updateEmploymentData(user: any, employeeDto: EmploymentDto) {
    console.log(user);
  }
}
