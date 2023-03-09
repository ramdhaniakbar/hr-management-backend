import {
    IsBoolean,
    IsDate,
    IsDateString,
    IsDecimal,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
  } from 'class-validator';
  import { Decimal128 } from 'mongoose';
  
  export class EventDto {
    @IsNotEmpty()
    @IsString()
    eventName: string;
  
    @IsNotEmpty()
    @IsDateString()
    eventDate: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(31)
    eventDuration: number;
  
    @IsNotEmpty()
    @IsBoolean()
    companyHoliday: boolean;
  
    @IsNotEmpty()
    @IsDateString()
    startTime: string;
  
    @IsNotEmpty()
    @IsDateString()
    endTime: string;
  
    @IsNotEmpty()
    @IsString()
    note: string;
  }
  
  