import { Type } from "class-transformer";
import { IsBoolean, IsEnum,  IsNotEmpty, IsNumber, IsObject, Max, Min, ValidateNested } from "class-validator";
import { jhtSettingTypes, taxable, taxMethod } from "src/enum";

class attendance{
    @IsNumber()
    @Min(1)
    @Max(31)
    @IsNotEmpty()
    from: number

    @IsNumber()
    @Min(1)
    @Max(31)
    @IsNotEmpty()
    to: number
}


export class cutOffDto{
    
    @IsNotEmpty()
    @IsBoolean()
    default: boolean

    @IsEnum(taxMethod)
    @IsNotEmpty()
    employeeTaxSetting: taxMethod

    @IsEnum(taxable)
    @IsNotEmpty()
    employeeSalaryTaxSetting: taxable

    @IsEnum(jhtSettingTypes)
    @IsNotEmpty()
    jhtSetting: jhtSettingTypes

    @IsEnum(jhtSettingTypes)
    @IsNotEmpty()
    bpjsKesehatanSetting: jhtSettingTypes

    @IsEnum(jhtSettingTypes)
    @IsNotEmpty()
    jaminanPensiunSetting: jhtSettingTypes

    @IsObject()
    @ValidateNested({each: true})
    @Type(() => attendance)
    attendance: attendance

    @IsObject()
    @ValidateNested({each: true})
    @Type(() => attendance)
    payroll: attendance

    @IsNotEmpty()
    @IsBoolean()
    attendancePayLastMonth: boolean
}