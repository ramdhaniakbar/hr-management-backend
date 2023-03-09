import { IsDateString,  IsNotEmpty, IsNumber, IsString } from "class-validator";

export class currencyRateDto{

    @IsString()
    @IsNotEmpty()
    currencyRateName:string

    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsDateString()
    @IsNotEmpty()
    effectiveDate: string
}