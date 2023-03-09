import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { getThrBasedOn, includeBpjs } from 'src/enum';

class payrollComponent {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  allowance: string;
}

class multiplier {
  @IsNumber()
  @Min(1970)
  @Max(2022)
  @IsNotEmpty()
  joinedYear: number;

  @IsNumber()
  @Min(0)
  @Max(999)
  @IsNotEmpty()
  multiplyBy: number;
}

export class thrSettingDto {
  @IsString()
  @IsEnum(getThrBasedOn)
  @IsNotEmpty()
  thrType: string;

  @IsNumber()
  @Min(1)
  @Max(999)
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  getThrAfterDays: number;

  @IsNumber()
  @Min(1)
  @Max(31)
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  getThrAfterMonths: number;

  @IsNumber()
  @Min(1)
  @Max(999)
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  numberOfDays: number;

  @IsNumber()
  @Min(1)
  @Max(30)
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  rounding: number;

  @IsBoolean()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  noRounding: boolean;

  @IsString()
  @IsEnum(includeBpjs)
  @IsNotEmpty()
  includeBpjs: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => payrollComponent)
  thrComponent: payrollComponent[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => multiplier)
  multiplierSettings: multiplier[];
}
