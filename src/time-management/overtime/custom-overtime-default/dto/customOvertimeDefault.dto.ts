import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { filters } from 'src/utility/filter.dto';

export class customOvertimeDefaultDto {
  @IsMongoId()
  @IsOptional()
  _id: string;

  @IsString()
  @IsNotEmpty()
  customOvertimeDefaultName: string;

  @IsNotEmpty()
  @IsMongoId()
  dayOff: string;

  @IsNotEmpty()
  @IsMongoId()
  nationalHoliday: string;

  @IsNotEmpty()
  @IsMongoId()
  workingDay: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => filters)
  @ValidateIf((object, value) => value !== null)
  filterEmployee: filters;
}
