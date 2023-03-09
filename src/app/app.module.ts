import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.module';
import { AccessModule } from 'src/access/access.module';
import { MasterTableModule } from 'src/master-table/master-table.module';
import { CashAdvanceCategoryModule } from 'src/finance/cash-advance/cash-advance-category/cash-advance-category.module';
import { CashAdvancePolicyModule } from 'src/finance/cash-advance/cash-advance-policy/cash-advance-policy.module';
import { RequestCashAdvanceModule } from 'src/finance/cash-advance/request-cash-advance/request-cash-advance.module';
import { CashAdvanceSettlementModule } from 'src/finance/cash-advance/cash-advance-settlement/cash-advance-settlement.module';
import { LoanModule } from 'src/finance/loan/loan.module';
import { ReimbursementPolicyModule } from 'src/finance/reimbursement/reimbursement-policy/reimbursement-policy.module';
import { AssignUpdateReimbursementModule } from 'src/finance/reimbursement/assign-update-reimbursement/assign-update-reimbursement.module';
import { ReimbursementBalanceModule } from 'src/finance/reimbursement/reimbursement-balance/reimbursement-balance.module';
import { RequestReimbursementModule } from 'src/finance/reimbursement/request-reimbursement/request-reimbursement.module';
import { BreakTypeModule } from 'src/time-management/schedule/break-type/break-type.module';
import { SchedulesModule } from 'src/time-management/schedule/schedule/schedule.module';
import { ShiftDetailTypeModule } from 'src/time-management/schedule/shift-detail-type/shift-detail-type.module';
import { ShiftPatternModule } from 'src/time-management/schedule/shift-pattern/shift-pattern.module';
import { TimeOffTypePolicyModule } from 'src/time-management/time-off/time-off-type-policy/time-off-type-policy.module';
import { RequestTimeOffModule } from 'src/time-management/time-off/request-time-off/request-time-off.module';
import { UpdateTimeOffBalanceModule } from 'src/time-management/time-off/update-time-off-balance/update-time-off-balance.module';
import { TimeOffBalanceModule } from 'src/time-management/time-off/time-off-balance/time-off-balance.module';
import { RequestChangeShiftModule } from 'src/time-management/attendance/request-change-shift/request-change-shift.module';
import { AttendanceMachineSettingModule } from 'src/time-management/attendance/attendance-machine-setting/attendance-machine-setting.module';
import { AttendanceModule } from 'src/time-management/attendance/attendance/attendance.module';
import { OvertimeCompanySettingsModule } from 'src/time-management/overtime/overtime-company-settings/overtime-company-settings.module';
import { PayrollScheduleModule } from 'src/payroll/payroll-schedule/payroll-schedule.module';
import { PaymentScheduleModule } from 'src/payroll/payment-schedule/payment-schedule.module';
import { CurrencyRateModule } from 'src/payroll/currency-rate/currency-rate.module';
import { CustomRateModule } from 'src/payroll/custom-rate/custom-rate.module';
import { ProRateSettingModule } from 'src/payroll/pro-rate-setting/pro-rate-setting.module';
import { AbsenceSettingModule } from 'src/payroll/absence-setting/absence-setting.module';
import { PayrollComponentAllowanceModule } from 'src/payroll/payroll-component-allowance/payroll-component-allowance.module';
import { PayrollComponentDeductionModule } from 'src/payroll/payroll-component-deduction/payroll-component-deduction.module';
import { PayrollComponentBpjsModule } from 'src/payroll/payroll-component-bpjs/payroll-component-bpjs.module';
import { TimeOffCompensationSettingModule } from 'src/payroll/time-off-compensation-setting/time-off-compensation-setting.module';
import { CutOffModule } from 'src/payroll/cut-off/cut-off.module';
import { MasterOvertimeModule } from 'src/time-management/overtime/master-overtime/master-overtime.module';
import { OvertimeDefaultModule } from 'src/time-management/overtime/overtime-default/overtime-default.module';
import { CustomOvertimeDefaultModule } from 'src/time-management/overtime/custom-overtime-default/custom-overtime-default.module';
import { RequestOvertimeModule } from 'src/time-management/overtime/request-overtime/request-overtime.module';
import { TaskForNewEmployeeModule } from 'src/onboarding/task-for-new-employee/task-for-new-employee.module';
import { OnboardingSettingModule } from 'src/onboarding/onboarding-setting/onboarding-setting.module';
import { AssetModule } from 'src/onboarding/asset/asset.module';
import { BorrowAssetModule } from 'src/onboarding/borrow-asset/borrow-asset.module';
import { ProjectModule } from 'src/onboarding/project/project.module';
import { TaskModule } from 'src/onboarding/task/task.module';
import { ActivityLogModule } from 'src/onboarding/activity-log/activity-log.module';
import { TimeTrackerHistoryModule } from 'src/onboarding/time-tracker-history/time-tracker-history.module';
import { AnnouncementModule } from 'src/onboarding/announcement/announcement.module';
import { PollModule } from 'src/onboarding/poll/poll.module';
import { ChangeEmployeeStatusModule } from 'src/users/change-employee-status/change-employee-status.module';
import { EmployeeResignationModule } from 'src/users/employee-resignation/employee-resignation.module';
import { InboxModule } from 'src/users/inbox/inbox.module';
import { MyFilesModule } from 'src/users/my-files/my-files.module';
import { EmployeeEducationAndExperienceModule } from 'src/users/employee-education-and-experience/employee-education-and-experience.module';
import { EmployeePersonalDataModule } from 'src/users/employee-personal-data/employee-personal-data.module';
import { EmployeePayrollModule } from 'src/users/employee-payroll/employee-payroll.module';
import { PayslipModule } from 'src/users/payslip/payslip.module';
import { PayrollComponentBenefitModule } from 'src/payroll/payroll-component-benefit/payroll-component-benefit.module';
import { ResignCompensationModule } from 'src/payroll/resign-compensation/resign-compensation.module';
import { ThrSettingModule } from 'src/payroll/thr-setting/thr-setting.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestDelegationModule } from 'src/users/request-delegation/request-delegation.module';
import { TimeOffTypePolicySettingModule } from 'src/time-management/time-off/time-off-type-policy-setting/time-off-type-policy-setting.module';

@Module({
  imports: [
    CashAdvanceCategoryModule,
    LoanModule,
    RequestCashAdvanceModule,
    CashAdvanceSettlementModule,
    CashAdvancePolicyModule,
    AccessModule,
    AuthModule,
    CompanyModule,
    UserModule,
    MasterTableModule,
    ReimbursementPolicyModule,
    AssignUpdateReimbursementModule,
    ReimbursementBalanceModule,
    RequestReimbursementModule,
    BreakTypeModule,
    SchedulesModule,
    ShiftDetailTypeModule,
    ShiftPatternModule,
    TimeOffTypePolicyModule,
    RequestTimeOffModule,
    UpdateTimeOffBalanceModule,
    TimeOffBalanceModule,
    AttendanceMachineSettingModule,
    AttendanceModule,
    RequestChangeShiftModule,
    RequestChangeShiftModule,
    OvertimeCompanySettingsModule,
    CashAdvanceSettlementModule,
    PayrollScheduleModule,
    PaymentScheduleModule,
    CurrencyRateModule,
    CustomRateModule,
    ProRateSettingModule,
    AbsenceSettingModule,
    PayrollComponentAllowanceModule,
    PayrollComponentDeductionModule,
    PayrollComponentBpjsModule,
    PayrollComponentBenefitModule,
    PayrollComponentDeductionModule,
    ResignCompensationModule,
    TimeOffCompensationSettingModule,
    ThrSettingModule,
    CutOffModule,
    OvertimeCompanySettingsModule,
    MasterOvertimeModule,
    OvertimeDefaultModule,
    CustomOvertimeDefaultModule,
    RequestOvertimeModule,
    TaskForNewEmployeeModule,
    OnboardingSettingModule,
    AssetModule,
    BorrowAssetModule,
    ProjectModule,
    TaskModule,
    ActivityLogModule,
    TimeTrackerHistoryModule,
    AnnouncementModule,
    PollModule,
    ChangeEmployeeStatusModule,
    EmployeeResignationModule,
    InboxModule,
    MyFilesModule,
    EmployeeEducationAndExperienceModule,
    EmployeePersonalDataModule,
    EmployeePayrollModule,
    PayslipModule,
    RequestDelegationModule,
    TimeOffTypePolicySettingModule,
    MongooseModule.forRoot(
      'mongodb+srv://Hendri:qwerty123@cluster0.yenr7.mongodb.net/EzHandler?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/upload-file'),
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
