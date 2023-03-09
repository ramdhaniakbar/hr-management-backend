import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsString, Length, ValidateIf, ValidateNested } from "class-validator";

export class cashAdvanceCategoryDto{

    @IsNotEmpty()
    @IsString()
    categoryName: string;

    @IsNotEmpty()
    @IsBoolean()
    SetLimitAmountPerRequest: boolean;

    //exist if SetlimitAmountPerRequest true
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    limitAmountPerRequest: number;
    
}