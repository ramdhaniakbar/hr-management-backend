import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { durationTypes } from 'src/enum';

export class IdInformalEducationDto {
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsString()
  educationName: string;

  @IsOptional()
  @IsString()
  heldBy: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsEnum(durationTypes)
  durationType: durationTypes;

  @IsNumber()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  duration: number = 1;

  @IsOptional()
  @IsNumber()
  fee: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  haveCertification: boolean;

  @IsOptional()
  @IsString()
  attachFile: string;
}
