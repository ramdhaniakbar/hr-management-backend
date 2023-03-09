import { IsAlphanumeric, IsEmail, IsMongoId, IsNotEmpty, IsString, Length } from "class-validator"

export class AccountActivationDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    _id:string
}