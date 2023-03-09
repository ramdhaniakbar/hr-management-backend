import { IsDateString,  IsNotEmpty, IsNumber, IsString } from "class-validator";

export class customRateDto{

    @IsString()
    @IsNotEmpty()
    customRateName:string

    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsDateString()
    @IsNotEmpty()
    effectiveDate: string
}