import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator"
import { prorateSettingTypes } from "src/enum"

export class prorateSettingDto{

    @IsString()
    @IsNotEmpty()
    @IsEnum(prorateSettingTypes)
    prorateSettingType: string

    @IsBoolean()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    countNationalHoliday: boolean

    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    customNumber: number
}