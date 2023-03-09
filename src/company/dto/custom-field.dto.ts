import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  import { customFieldType } from '../enum';
  
  export class CustomFieldDto {
    @IsNotEmpty()
    @IsString()
    fieldName: string;
  
    @IsNotEmpty()
    @IsEnum(customFieldType)
    fieldType: customFieldType;
  
    @IsBoolean()
    ees: boolean;
  
    @IsBoolean()
    cv: boolean;
  
    @IsArray()
    //   @IsString()
    fieldOption: [string];
  }
  
  