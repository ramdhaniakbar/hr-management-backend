import { forwardRef, Module } from "@nestjs/common";
import {MongooseModule} from '@nestjs/mongoose'
import { AbilityModule } from "src/ability/ability.module";
import { AccessSchema } from "src/access/access.model";
import { AccessModule } from "src/access/access.module";
import { UserSchema } from "./user.model";
import { userController } from "./users.controller";
import { UserService } from "./users.service";
// import { InboxModule } from './inbox/inbox.module';
// import { MyFilesModule } from './my-files/my-files.module';
// import { PayslipModule } from './payslip/payslip.module';
// import { EmployeeEducationAndExperienceModule } from './employee-education-and-experience/employee-education-and-experience.module';
// import { EmployeePayrollModule } from './employee-payroll/employee-payroll.module';
// import { EmployeePersonalDataModule } from './employee-personal-data/employee-personal-data.module';
// import { EmployeeResignationModule } from './employee-resignation/employee-resignation.module';
// import { ChangeEmployeeStatusModule } from './change-employee-status/change-employee-status.module';
import { CustomDataModule } from './custom-data/custom-data.module';
import { CompanyModule } from "src/company/company.module";
import { EmployeePayrollModule } from "./employee-payroll/employee-payroll.module";
import { EmployeePersonalDataModule } from "./employee-personal-data/employee-personal-data.module";
import { SchedulesModule } from "src/time-management/schedule/schedule/schedule.module";
import { PayrollScheduleModule } from "src/payroll/payroll-schedule/payroll-schedule.module";
import { PaymentScheduleModule } from "src/payroll/payment-schedule/payment-schedule.module";
import { MasterTableModule } from "src/master-table/master-table.module";
import { ProRateSettingModule } from "src/payroll/pro-rate-setting/pro-rate-setting.module";
import { CustomOvertimeDefaultModule } from "src/time-management/overtime/custom-overtime-default/custom-overtime-default.module";
import { TimeOffBalanceModule } from "src/time-management/time-off/time-off-balance/time-off-balance.module";
import { MulterModule } from "@nestjs/platform-express";
import { RequestDelegationModule } from './request-delegation/request-delegation.module';

@Module({
    imports:[
            forwardRef(()=>AbilityModule) , AccessModule ,MongooseModule.forFeature([{ name: 'User', schema: UserSchema}, 
            { name: 'Access', schema: AccessSchema}]), CustomDataModule,  forwardRef(()=>CompanyModule),EmployeePayrollModule, 
            EmployeePersonalDataModule ,SchedulesModule, PayrollScheduleModule, PaymentScheduleModule, MasterTableModule, ProRateSettingModule, CustomOvertimeDefaultModule, TimeOffBalanceModule,
            MulterModule.register({dest: '../../upload-file/profile-picture' }),
            RequestDelegationModule
    //   forwardRef(()=>)
    // ,InboxModule, MyFilesModule, PayslipModule, EmployeeEducationAndExperienceModule, EmployeeResignationModule, ChangeEmployeeStatusModule
  ],
    providers: [UserService],
    controllers: [userController],
    exports: [UserService]
})

export class UserModule{}