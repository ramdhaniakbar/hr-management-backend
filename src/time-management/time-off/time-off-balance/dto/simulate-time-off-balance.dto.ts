import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator"
import { timeOffSimulationTypes } from "src/enum"

export class simulateTimeOffBalanceDto{

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    policy:string

    @IsEnum(timeOffSimulationTypes)
    @IsString()
    @IsNotEmpty()
    simulationType:string

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    user:string

    @IsDateString()
    @IsString()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    joinedDate:string

    @IsDateString()
    @IsString()
    @IsNotEmpty()
    currentDate:string
}