import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString, Length, ValidateIf, ValidateNested } from "class-validator";
import { Date, ObjectId } from "mongoose";

class category{
    @IsString()
    @IsNotEmpty()
    category: string;
}

export class cashAdvancePolicyDto{

    @IsNotEmpty()
    @IsString()
    policyName: string;

    @IsNotEmpty()
    @IsDateString()
    effectiveDate: string;

    @IsNotEmpty()
    @IsDateString()
    settlementDueDate: string;

    @IsNotEmpty()
    @IsBoolean()
    includeAllCategory: boolean;
    
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => category)
    @IsNotEmpty()
    @ValidateIf((object, value) => value !== null )
    categories: category

    
}