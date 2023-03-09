import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class AuthDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(8,24)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(5,24)
    name:string
}