import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class scheduleDto{

    @IsString()
    @IsNotEmpty()
    scheduleName:string

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    pattern: string

    @IsDateString()
    @IsNotEmpty()
    effectiveDate: string

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    initialShift: string

    @IsNotEmpty()
    @IsBoolean()
    overrideNationalHoliday: boolean

    @IsNotEmpty()
    @IsBoolean()
    overrideCompanyHoliday: boolean

    @IsNotEmpty()
    @IsBoolean()
    flexible: boolean

    @IsNotEmpty()
    @IsBoolean()
    includeLateInLateOut: boolean
}