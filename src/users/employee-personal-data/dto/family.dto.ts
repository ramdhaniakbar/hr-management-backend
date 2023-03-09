import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { genders, marital, relationships, religion } from 'src/enum';

export class FamilyDto {
  // @IsOptional()
  // @IsMongoId()
  // _id?: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEnum(relationships)
  relationship: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  @IsEnum(genders)
  gender: string;

  @IsOptional()
  @IsString()
  job: string;

  @IsNotEmpty()
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
