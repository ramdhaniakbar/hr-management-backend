import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { defaultEmploymentStatus } from 'src/enum';

export class EmploymentDto {
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  barcode: string;

  //can be either the 3 default employmentStatus or the id of employment status user self created
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @ValidateIf(
    (object, value) => !Object.values(defaultEmploymentStatus).includes(value),
  )
  employmentStatus: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  joinedDate: string;

  //only exist if employment status is not permanent and from employmentstatus
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @ValidateIf((object, value) => value !== null)
  endStatusDate: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  jobLevel: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  organization: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  grade: string;

  //class is null if grade have class
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  class: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  schedule: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  approvalLine: string;
}
