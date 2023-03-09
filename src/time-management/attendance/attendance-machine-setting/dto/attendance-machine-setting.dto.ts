import {IsEnum, IsNotEmpty, IsNumber, IsString, IsBoolean, ValidateIf, IsDateString, IsOptional } from 'class-validator';
import { attendanceTypes, dateFormatTypes, delimiters, fileTypes, flagTypes, timeFormatTypes } from 'src/enum';

export class attendanceMachineSettingDto{

    @IsString()
    @IsNotEmpty()
    @IsEnum(attendanceTypes)
    attendanceType: string;

    @IsNotEmpty()
    @IsString()
    startingRow: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(fileTypes)
    fileType: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(delimiters)
    @ValidateIf((object,value) => value !== undefined )
    delimiter: string;

    @IsNotEmpty()
    @IsNumber()
    barcode: number;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    barcodeLength: number;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    checkIn: number;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    checkInLength: number;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    checkOut: number;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    checkOutLength: number;

    @IsNotEmpty()
    @IsNumber()
    date: number;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    dateLength: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(dateFormatTypes)
    dateFormat: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(timeFormatTypes)
    timeFormat: string;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    time: number;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    timeLength: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(flagTypes)
    @ValidateIf((object,value) => value !== undefined )
    flagType: string;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    mode: number;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf((object,value) => value !== null )
    modeLength: number;

    @IsNotEmpty()
    @IsDateString()
    @ValidateIf((obejct,value) => value !== null )
    flagIn: Date;

    @IsNotEmpty()
    @IsDateString()
    @ValidateIf((obejct,value) => value !== null )
    flagOut: Date;

    @IsNotEmpty()
    @IsDateString()
    @ValidateIf((obejct,value) => value !== null )
    inAfter: Date;

    @IsNotEmpty()
    @IsDateString()
    @ValidateIf((obejct,value) => value !== null )
    inBefore: Date;

    @IsNotEmpty()
    @IsDateString()
    @ValidateIf((obejct,value) => value !== null )
    outAfter: Date;

    @IsNotEmpty()
    @IsDateString()
    @ValidateIf((obejct,value) => value !== null )
    outBefore: Date;

    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((obejct,value) => value !== null )
    onOff: boolean;

}