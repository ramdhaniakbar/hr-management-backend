import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class pollOptionDto{
    
    @IsMongoId()
    @IsNotEmpty()
    _id: string

    @IsNumber()
    @IsNotEmpty()
    pollOptionIndex: number

    @IsString()
    @IsNotEmpty()
    pollOption: string
}