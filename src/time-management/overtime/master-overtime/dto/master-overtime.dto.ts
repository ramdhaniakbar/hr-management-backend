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
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class rounding {
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @IsNumber()
  @IsNotEmpty()
  to: number;

  @IsNumber()
  @IsNotEmpty()
  roundingInto: number;
}

class customMultiply {
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @IsNumber()
  @IsNotEmpty()
  to: number;

  @IsNumber()
  @IsNotEmpty()
  multiply: number;
}

class tunjangan {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  tunjanganType: string;

  @IsNumber()
  @IsNotEmpty()
  totalTunjangan: number;
}

export class masterOvertimeDto {
  //   @IsString()
  //   @IsMongoId()
  @IsOptional()
  _id: string;

  @IsString()
  @IsNotEmpty()
  masterOvertimeName: string;

  @IsBoolean()
  @IsNotEmpty()
  noRounding: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => rounding)
  @ValidateIf((object, value) => value !== null)
  rounding: rounding[];

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  perDay: number;

  @IsBoolean()
  @IsNotEmpty()
  customMultiplier: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => customMultiply)
  // @ValidateIf((object, value) => value !== null)
  customMultiplierWeekDay: customMultiply[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => customMultiply)
  // @ValidateIf((object, value) => value !== null)
  customMultiplierWeekend: customMultiply[];

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  salary: number;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => tunjangan)
  @ValidateIf((object, value) => value !== null)
  tunjangan: tunjangan;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  formula: string = 'formula';

  @IsNumber()
  @IsNotEmpty()
  minimalPaymentBefore: number;

  @IsNumber()
  @IsNotEmpty()
  minimalPaymentAfter: number;
}
