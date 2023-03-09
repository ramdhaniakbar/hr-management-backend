import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { durationTypes } from 'src/enum';

export class InformalEducationDto {
  @IsNotEmpty()
  @IsString()
  educationName: string;

  @IsOptional()
  @IsString()
  heldBy: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
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
  haveCertificate: boolean;

  @IsOptional()
  @IsString()
  attachFile: string;
}
