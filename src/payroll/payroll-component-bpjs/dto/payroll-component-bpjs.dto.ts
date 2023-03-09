import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsObject, IsString, Min, ValidateIf, ValidateNested } from "class-validator";
import { salaryTypes, useSalaryTypes } from "src/enum";

class payrollComponent{
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    allowance: string
}

export class payrollComponentBpjsDto{

    @IsString()
    @IsNotEmpty()
    bpjsName: string

    @IsBoolean()
    @IsNotEmpty()
    normalCalculation: boolean

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(() => payrollComponent)
    @ValidateIf((object,value) => value !== null )
    payrollComponentIncluded: payrollComponent[]

    @IsBoolean()
    @IsNotEmpty()
    includeBackpay: boolean

    @IsEnum(salaryTypes)
    @IsString()
    @IsNotEmpty()
    salaryType: string

    @IsEnum(useSalaryTypes)
    @IsString()
    @IsNotEmpty()
    useSalaryType: string
}