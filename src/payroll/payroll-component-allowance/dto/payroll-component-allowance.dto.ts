import { Type } from "class-transformer"
import { ArrayMinSize, IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsString, ValidateIf, ValidateNested } from "class-validator"
import { amountTypes, payrollScheduleTypes, taxable } from "src/enum"
import { filters } from "src/utility/filter.dto"

class maximumAmount{
    @IsString()
    @IsNotEmpty()
    @IsEnum(amountTypes)
    maxAmountType: string

    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    maxAmount: number
}

export class payrollComponentAllowanceDto{

    @IsString()
    @IsNotEmpty()
    allowanceName: string

    @IsNumber()
    @IsNotEmpty()
    amount: number

    //can be "Default" or a mongo id
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ValidateIf((object,value) => value !== "Default" )
    currency: string
    
    //can be "Default" or a mongo id
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ValidateIf((object,value) => value !== "Default" )
    payrollPaymentSchedule: string


    @IsString()
    @IsNotEmpty()
    @IsEnum(payrollScheduleTypes)
    type: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(taxable)
    tax:string

    //only exist if not type "One Time"
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    default:boolean

    //doesn't exist if default is false or null
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    allNewEmployee:boolean

    // exist if all new employee is false and default is true 
    @IsObject()
    @ValidateNested({each: true})
    @Type(() => filters)
    @ValidateIf((object,value) => value !== null )
    filter: filters

    //only exist if type is "Monthly"
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    proRate: boolean

    //only exits if type is "Daily"
    @IsObject()
    @ValidateNested({each: true})
    @Type(() => maximumAmount)
    @ValidateIf((object,value) => value !== null )
    maximumAmount: maximumAmount

    //only exist if type is "One Time"
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    bonus:boolean   
}


