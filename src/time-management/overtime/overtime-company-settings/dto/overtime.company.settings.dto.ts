import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class rounding {
  @IsNotEmpty()
  @IsNumber()
  from: number;

  @IsNotEmpty()
  @IsNumber()
  to: number;

  @IsNotEmpty()
  @IsNumber()
  roundingInto: number;
}

class multiplier {
  @IsNotEmpty()
  @IsNumber()
  from: number;

  @IsNotEmpty()
  @IsNumber()
  to: number;

  @IsNotEmpty()
  @IsNumber()
  multiply: number;
}

class overtimeCompesation {
  @IsNotEmpty()
  @IsBoolean()
  default: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  overrideIdr: number;
}

class minimalOvertimePayment {
  @IsOptional()
  @IsNumber()
  minimalPaymentBefore: number;

  @IsOptional()
  @IsNumber()
  minimalPaymentAfter: number;
}

class automaticOvertimeSetting {
  @IsNotEmpty()
  @IsBoolean()
  allowAutoRequest: boolean;

  @IsOptional()
  @IsBoolean()
  sendEmailAuto: boolean;

  @IsOptional()
  @IsNumber()
  minimalOvertimeBefore: number;

  @IsOptional()
  @IsNumber()
  minimalOvertimeAfter: number;

  @IsOptional()
  @IsNumber()
  overtimeBreakBefore: number;

  @IsOptional()
  @IsNumber()
  overtimeBreakAfter: number;
}

export class overtimeCompanySettingsDto {
  @IsOptional()
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsBoolean()
  noRounding: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => rounding)
  @ValidateIf((object, value) => value !== null)
  rounding: rounding[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => multiplier)
  @ValidateIf((object, value) => value !== null)
  multiplierWorkingDays: multiplier[];

  @IsNotEmpty()
  @IsMongoId()
  @ValidateIf((object, value) => value !== 'Default')
  dayOffShiftType: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => multiplier)
  @ValidateIf((object, value) => value !== null)
  multiplierDayOff: multiplier[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => overtimeCompesation)
  @ValidateIf((object, value) => value !== null)
  overtimeCompesation: overtimeCompesation;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => minimalOvertimePayment)
  @ValidateIf((object, value) => value !== null)
  minimalOvertimePayment: minimalOvertimePayment;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => automaticOvertimeSetting)
  @ValidateIf((object, value) => value !== null)
  automaticOvertimeSetting: automaticOvertimeSetting;

  @IsNotEmpty()
  //   @IsMongoId()
  overtimePaymentSchedule: string;
}
