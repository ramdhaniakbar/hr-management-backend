import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { dividedByTypes } from 'src/enum';
import { typeTimeOffCompensation } from 'src/enum/type-time-off-compensation.enum';

class component {
  @IsMongoId()
  @IsString()
  allowance: string;
}

export class timeOffCompensationSettingDto {
  @IsEnum(typeTimeOffCompensation)
  @IsNotEmpty()
  typeOffCompensation: typeTimeOffCompensation;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  amount: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @ValidateIf((object, value) => value !== null)
  @Type(() => component)
  component: component[];

  @IsOptional()
  @IsEnum(dividedByTypes)
  @ValidateIf((object, value) => value !== null)
  dividedBy?: dividedByTypes;
}
