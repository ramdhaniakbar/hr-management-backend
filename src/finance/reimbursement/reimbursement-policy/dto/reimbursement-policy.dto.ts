import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsDefined, IsEnum, IsMongoId, isNotEmpty, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, isString, IsString, Length, ValidateNested } from "class-validator";
import { taxGroups } from "src/enum";

class filterEmployee{

    @IsString({each: true})
    @IsNotEmpty({each: true})
    organization:String[];

    @IsString({each: true})
    @IsNotEmpty({each: true})
    jobLevel!:String[];
}

class expiredDayMont{

    @IsNotEmpty()
    @IsNumber()
    day: number;

    @IsNotEmpty()
    @IsNumber()
    month: number;

    @IsNotEmpty()
    @IsNumber()
    minimumExpiry: number;

}

class annually{

    @IsNotEmpty()
    @IsNumber()
    dayEmerge: number;

    @IsNotEmpty()
    @IsNumber()
    monthEmerge: number;

    @IsNotEmpty()
    @IsNumber()
    yearEmerge: number;

}

class benefit{

    @IsNotEmpty()
    @IsMongoId()
    _id: string;

    @IsNotEmpty()
    @IsString()
    benefitName: string;

    @IsNotEmpty()
    @IsNumber()
    maxRequest: number;

    @IsNotEmpty()
    @IsNumber()
    readonly minClaim: number;

}

export class reimbursementPolicyDto{

    @IsNotEmpty()
    @IsString()
    reimbursementName: string;

    @IsNotEmpty()
    @IsDate()
    effectiveDate: Date;

    @IsNotEmpty()
    @IsString()
    reimbursementDescription: string;

    @IsNotEmpty()
    @IsBoolean()
    unlimitedAmount: boolean;

    @IsNotEmpty()
    @IsBoolean()
    defaultForNewEmployee: boolean;
    
    @IsNotEmpty()
    @IsBoolean()
    forAll: boolean;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested({each: true})
    @Type(() => filterEmployee)
    filterEmployee: filterEmployee[];

    @IsNotEmpty()
    @IsBoolean()
    includeInTakeHomePay: boolean;

    @IsNotEmpty()
    @IsBoolean()
    taxable: boolean;

    @IsNotEmpty()
    @IsEnum(taxGroups)
    taxGroup: taxGroups;

    @IsNotEmpty()
    @IsNumber()
    expiredInMonths: number;

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => expiredDayMont)
    expiredDayMont: expiredDayMont[];

    @IsNotEmpty()
    @IsBoolean()
    proRateOnFirstYear: boolean;

    @IsNotEmpty()
    @IsBoolean()
    noExpiryDate: boolean;

    @IsNotEmpty()
    @IsBoolean()
    maxRequestPerEmerge: number

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => annually)
    annually: annually[];

    @IsNotEmpty()
    @IsBoolean()
    anniversary: boolean;

    @IsNotEmpty()
    @IsBoolean()
    monthly: boolean;
}
