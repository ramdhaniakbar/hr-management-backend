import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsString, Max, Min, ValidateIf, ValidateNested } from "class-validator";
import { days, paymentScheduleTypes } from "src/enum";



class amount{
    @IsNumber()
    @IsNotEmpty()
    from: number

    @IsNumber()
    @IsNotEmpty()
    to: number
}

export class paymentScheduleDto{

    @IsString()
    @IsNotEmpty()
    paymentScheduleName: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(paymentScheduleTypes)
    paymentScheduleType: string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(31)
    payrollDate: number

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== "Default" )
    parentSchedule: string

    @IsBoolean()
    @IsNotEmpty()
    taxCalculateWithSalary: boolean

    @IsObject()
    @ValidateNested({each: true})
    @Type(() => amount)
    @ValidateIf((object,value) => value !== null )
    attendance: amount

    @IsObject()
    @ValidateNested({each: true})
    @IsNotEmpty()
    @Type(() => amount)
    @ValidateIf((object,value) => value !== null )
    payroll: amount

    @IsBoolean()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    attendancePayLastMonth: boolean

    @IsDateString()
    @IsString()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    startDate: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(days)
    @ValidateIf((object,value) => value !== null )
    cutOffDay: string
}

