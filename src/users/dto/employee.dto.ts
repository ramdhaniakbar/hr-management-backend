import { Type } from 'class-transformer';
import {
  Equals,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  length,
  Length,
  max,
  Max,
  min,
  Min,
  NotEquals,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  blood,
  defaultEmploymentStatus,
  employeeTaxStatus,
  genders,
  idTypes,
  marital,
  paid,
  payrollScheduleTypes,
  prorateSettingTypes,
  ptkpStatus,
  religion,
  taxable,
  taxMethod,
} from 'src/enum';

class prorateSettingType {
  @IsNotEmpty()
  @IsString()
  @IsEnum(prorateSettingTypes)
  prorateSetting: prorateSettingTypes;

  @IsNotEmpty()
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  countNationalHoliday: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  customNumber: number;
}

class identityAndAddress {
  @IsNotEmpty()
  @IsString()
  @IsEnum(idTypes)
  @ValidateIf((object, value) => value !== undefined)
  idType: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  idNumber: string;

  //can be null if permanent is true
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @ValidateIf((object, value) => value !== null)
  @IsOptional()
  idExpirationDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  permanent: boolean;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  citizenAddress: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  useAsResidentalAddress: boolean;

  //can be null if useAsResidentalAddress is true
  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  @IsOptional()
  residentalAddress: string;
}

class empPersonalData {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(10, 13)
  @IsPhoneNumber('ID')
  @IsNotEmpty()
  @IsOptional()
  mobilePhoneNo: string;

  @IsString()
  @Length(10, 13)
  @IsPhoneNumber('ID')
  @IsNotEmpty()
  @IsOptional()
  phoneNo: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  placeOfBirth: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(genders)
  @ValidateIf((object, value) => value !== undefined)
  gender: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(marital)
  maritalStatus: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(blood)
  @ValidateIf((object, value) => value !== undefined)
  bloodType: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(religion)
  religion: string;

  @IsObject()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => identityAndAddress)
  identityAddress: identityAndAddress;
}

class empData {
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  barcode: string;

  //can be either the 3 default employmentStatus or the id of employment status user self created
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @ValidateIf(
    (object, value) => !Object.values(defaultEmploymentStatus).includes(value),
  )
  employmentStatus: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  joinedDate: string;

  //only exist if employment status is not permanent and from employmentstatus
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @ValidateIf((object, value) => value !== null)
  endStatusDate: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  jobLevel: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  organization: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  grade: string;

  //class is null if grade have class
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  class: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  schedule: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  approvalLine: string;
}

class empPayroll {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(payrollScheduleTypes)
  salaryType: string;

  //ketika tidak memilih salah satu payment schedule maka bisa memilih Default dimana ditandakan bahwa akan memilih payroll schedule company
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ValidateIf((object, value) => value !== 'Default')
  paymentSchedule: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null && value !== 'Default')
  prorateSettingDefault: string;

  @IsObject()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => prorateSettingType)
  @ValidateIf((object, value) => value !== null)
  prorateSetting: prorateSettingType;

  @IsNotEmpty()
  @IsBoolean()
  allowForOvertime: boolean;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  bankName: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  accountHolder: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  npwp: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ptkpStatus)
  ptkpStatus: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(taxMethod)
  @ValidateIf((object, value) => value !== undefined)
  taxMethod: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(taxable)
  @ValidateIf((object, value) => value !== undefined)
  taxSalary: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @IsOptional()
  taxableDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(employeeTaxStatus)
  @ValidateIf((object, value) => value !== undefined)
  employeeTaxStatus: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  beginningNetto: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  pph21Paid: number;

  // ketika dicreate harus ditambahkan effective date, current dan new npp kedalam objectnya
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  nppBpjsKetenagakerjaan: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @IsOptional()
  bpjsKetenagakerjaanDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  bpjsKesehatanNumber: string;

  @IsNumber()
  @Min(0)
  @Max(9)
  @IsNotEmpty()
  @IsOptional()
  bpjsKesehatanFamily: number;

  //cannot be Not Paid
  @ValidateIf((object, value) => value !== undefined)
  @NotEquals(paid.notPaid)
  @IsNotEmpty()
  @IsString()
  @IsEnum(paid)
  bpjsKesehatanCost: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @IsOptional()
  bpjsKesehatanDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(paid)
  @ValidateIf((object, value) => value !== undefined)
  jhtCost: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(paid)
  @ValidateIf((object, value) => value !== undefined)
  jaminanPensiunCost: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @IsOptional()
  jaminanPensiunDate: Date;
}

export class EmployeeDto {
  @IsObject()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => empPersonalData)
  personalData: empPersonalData;

  @IsObject()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => empData)
  employmentData: empData;

  @IsObject()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => empPayroll)
  payroll: empPayroll;
}
