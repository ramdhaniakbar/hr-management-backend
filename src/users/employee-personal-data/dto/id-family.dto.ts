import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { genders, marital, relationships, religion } from 'src/enum';

export class IdFamilyDto {
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEnum(relationships)
  relationship: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  birthDate: string;

  @IsOptional()
  @IsString()
  idNumber: string;

  @IsOptional()
  @IsString()
  @IsEnum(marital)
  maritalStatus: string;

  @IsOptional()
  @IsString()
  @IsEnum(genders)
  gender: string;

  @IsOptional()
  @IsString()
  job: string;

  @IsOptional()
  @IsString()
  @IsEnum(religion)
  religion: string;

  @IsOptional()
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  emergencyContact: boolean;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  phoneNumber: string;
}
