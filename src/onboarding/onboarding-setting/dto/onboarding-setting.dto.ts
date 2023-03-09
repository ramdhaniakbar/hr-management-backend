import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class task {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  task: string;
}

export class onboardingSettingDto {
  @IsNotEmpty()
  @IsString()
  settingName: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  jobLevel: string;

  @IsNotEmpty()
  @IsString()
  workLocation: string;

  @IsNotEmpty()
  @IsString()
  instruction: string;

  @IsNotEmpty()
  @IsString()
  selectOnMap: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => task)
  taskForInviter: task[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => task)
  taskForNewEmployee: task[];

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  organization: string;
}
