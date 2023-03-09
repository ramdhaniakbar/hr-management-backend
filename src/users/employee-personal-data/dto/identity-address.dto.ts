import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { idTypes } from 'src/enum';

export class IdentityAddressDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(idTypes)
  @ValidateIf((object, value) => value !== undefined)
  idType: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  idNumber: string;

  //can be null if permanent is true
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @ValidateIf((object, value) => value !== null)
  @IsOptional()
  idExpirationDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  permanent: boolean;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  citizenAddress: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  useAsResidentalAddress: boolean;

  //can be null if useAsResidentalAddress is true
  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  @IsOptional()
  residentalAddress: string;
}
