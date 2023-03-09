import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class signinDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(8,24)
    password: string;

}