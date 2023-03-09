import { IsBoolean, IsBooleanString,IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { timeOffTypes } from "src/enum";
import { halfDayTypes } from "src/enum/half-day-types.enum";

export class requestTimeOffDto{
    
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    timeOffTypePolicy:string  

    @IsString()
    @IsNotEmpty()
    @IsEnum(timeOffTypes)
    timeOfftype:string

    @IsString()
    @ValidateIf((object,value) => value !== null )
    @IsNotEmpty()
    @IsEnum(halfDayTypes)
    halfDayType:string

    // @IsDateString()
    // @ValidateIf((object,value) => value !== null )
    // @IsNotEmpty()
    // scheduledIn:string

    // @IsDateString()
    // @ValidateIf((object,value) => value !== null )
    // @IsNotEmpty()
    // scheduledOut:string

    @IsDateString()
    @IsNotEmpty()
    startDate:string

    //null jika menggunakan tipe time off half day
    @IsDateString()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    endDate:string

    @IsString()
    @IsNotEmpty()
    notes:string

    // if delegate to true maka delegation must not be empty
    @IsNotEmpty()
    @IsBoolean()
    delegate:boolean

    
    // delegation selalu null kecuali delegate to true
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ValidateIf((object,value) => value !== null )
    delegateTo:string

    @IsString()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    attachment:string

}