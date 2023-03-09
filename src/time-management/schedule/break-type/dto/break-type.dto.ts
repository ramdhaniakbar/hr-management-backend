import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsDateString, IsMongoId, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { Date, ObjectId } from "mongoose";

class breakTime {

    @IsNotEmpty()
    @IsDateString()
    breakIn: any;

    @IsNotEmpty()
    @IsDateString()
    breakOut: any;

}

export class BreakTypeDto{
    
    @IsString()
    @IsNotEmpty()
    @Length(5, 24)
    breakName: string;

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => breakTime)
    breakTime: breakTime[];

}