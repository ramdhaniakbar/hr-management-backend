import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator"
import { absenceTypes } from "src/enum"

export class absenceSettingDto{

    @IsString()
    @IsNotEmpty()
    @IsEnum(absenceTypes)
    absenceAmountType: string

    //only exist if absence types is either Custom or Amount
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((object,value) => value !== null )
    customNumber:number
}