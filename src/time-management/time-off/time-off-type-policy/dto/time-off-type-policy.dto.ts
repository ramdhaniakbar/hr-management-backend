import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsDateString, IsDefined, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IS_DEFINED, Max, Min, ValidateIf, ValidateNested } from "class-validator";
import { roundingTypes, timeOffPolicyTypes } from "src/enum";


class organizations{
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    organization: string
}

class jobLevels{

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    jobLevel: string
}

class EmergeDay{
    //exist if customDays is null
    @IsNotEmpty()
    @IsBoolean()
    anniversary: boolean

    //exist if anniversarry is null 
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    customDays: number
}

class roundings{

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    from: Number

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    to: Number

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    equal: Number
}

class roundingTo{

    @IsNumber()
    @IsNotEmpty()
    from: Number

    @IsNumber()
    @IsNotEmpty()
    to: Number

    @IsEnum(roundingTypes)
    @IsNotEmpty()
    rounding: roundingTypes
}

class employmentStatuses{

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    employmentStatus: string
}

class filters{

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => organizations)
    organization: organizations[]

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => jobLevels)
    jobLevel: jobLevels[]
}


class PolicyDate{

    @IsNotEmpty()
    @IsDateString()
    date: string

    @IsNumber()
    @IsNotEmpty()
    minimumExpiryMonth: Number
}

export class timeOffTypePolicyDto{
    
    @IsString()
    @IsNotEmpty()
    policyName:string

    @IsString()
    @IsNotEmpty()
    policyCode:string

    @IsString()
    @IsNotEmpty()
    policyDescription:string

    @IsNotEmpty()
    @IsDateString()
    effectiveAsOf: string

    @IsNotEmpty()
    @IsBoolean()
    defaultForNewEmployee: boolean

    //only exist if defaultForNewEmployee true
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    allNewEmployee: boolean

    //only exist when allNewEmployee false
    @IsObject()
    @ValidateNested({each: true})
    @Type(() => filters)
    @ValidateIf((object,value) => value !== null )
    filter: filters

    @IsNotEmpty()
    @IsBoolean()
    unlimitedBalances: boolean

    //exist if unlimitedBalance is false
    @IsNotEmpty()
    @IsEnum(timeOffPolicyTypes)
    @ValidateIf((object,value) => value !== null )
    policyType: timeOffPolicyTypes
    
    //exist if policyType is monthly or annually
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    firstEmerge: boolean


    //exist if first emerge is true
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    effectiveFromJoinDate: boolean

    //exist if policyType is annually and firstEmerge is true
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    prorateOnFirstEmerge: boolean

    //exist if firstEmergeStatus is null and firstEmerge is true
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    emergeAfter: number

    //exist if emergeAfter is null and firstEmerge is true
    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => employmentStatuses)
    @ValidateIf((object,value) => value !== null )
    firstEmergeStatus: employmentStatuses[]


    //exist if policyType is annually or monthly
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    joinedDayRounding: number


    // exist if policyType is monthly
    @IsObject()
    @ValidateNested({each: true})
    @Type(() => EmergeDay)
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    emergeDay : EmergeDay

    //exist if policytype is annually
    @IsDateString()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    annualDate: string

    //exist if unlimitedBalance false
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    months: number
    
    //exist if unlimitedBalance false
    @IsObject()
    @ValidateNested({each: true})
    @Type(() => PolicyDate)
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    policyDate: PolicyDate

    //exist if unlimitedBalance false
    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    noExpiryDate: boolean

    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf((object,value) => value !== null )
    anniversary: boolean

    //exist if policyType is annually
    @IsArray()
    @ValidateNested({each: true})
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => roundingTo)
    @ValidateIf((object,value) => value !== null )
    rounding: roundingTo[]


    //exist if unlimited balance is false/policyType exist
    @IsArray()
    @ValidateNested({each: true})
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => roundings)
    @ValidateIf((object,value) => value !== null )
    balanceGenerated: roundings[]

}