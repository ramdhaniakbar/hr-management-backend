import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class SuperadminDto{

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(8,24)
    password: string;

    @IsNotEmpty()
    @IsString()
    phoneNo: string

    @IsString()
    @IsNotEmpty()
    @Length(5,24)
    name:string
}