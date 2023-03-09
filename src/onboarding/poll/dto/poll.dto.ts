import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";

class users{

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    user: string
}

class option{
    @IsString()
    @IsNotEmpty()
    pollOption: string

    // @IsArray()
    // @ValidateNested({each: true})
    // @ArrayMinSize(1)
    // @Type(() => users)
    // voters: users[]

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    pollOptionIndex: number
}


export class pollDto{
    
    @IsString()
    @IsNotEmpty()
    pollName:string

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => option)
    pollOption: option[]

    @IsNotEmpty()
    @IsDateString()
    endDate: string

    @IsNotEmpty()
    @IsBoolean()
    allowToCreateOther: boolean

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => users)
    participant: users[]

    @IsNotEmpty()
    @IsBoolean()
    allowToComment: boolean

    @IsNotEmpty()
    @IsBoolean()
    sendNotification: boolean
}