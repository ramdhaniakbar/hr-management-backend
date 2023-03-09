import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { educationGrades } from 'src/enum';

export class FormalEducationDto {
  @IsNotEmpty()
  @IsEnum(educationGrades)
  grade: educationGrades;

  @IsNotEmpty()
  @IsString()
  institutionName: string;

  @IsOptional()
  @IsString()
  major: string;

  @IsOptional()
  @IsString()
  score: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  start: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  end: string;
}
