import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class WorkingExperienceDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  jobPosition: string;

  @IsNotEmpty()
  @IsDateString()
  from: string;

  @IsOptional()
  @IsDateString()
  to: string;

  @IsOptional()
  @IsNumber()
  lengthOfService: number;
}
