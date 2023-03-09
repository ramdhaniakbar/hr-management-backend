import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class shiftDetail{
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    shift: string
}

export class shiftPatternDto{
    
    @IsString()
    @IsNotEmpty()
    patternName: string



    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => shiftDetail)
    shift: shiftDetail[]
}