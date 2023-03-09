import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { educationGrades } from 'src/enum';

export class IdFormalEducationDto {
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsEnum(educationGrades)
  grade: educationGrades;

  @IsOptional()
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
