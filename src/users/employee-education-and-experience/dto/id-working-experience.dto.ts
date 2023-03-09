import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class IdWorkingExperienceDto {
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  jobPosition: string;

  @IsOptional()
  @IsDateString()
  from: string;

  @IsOptional()
  @IsDateString()
  to: string;

  @IsOptional()
  @IsNumber()
  lengthOfService: number;
}
