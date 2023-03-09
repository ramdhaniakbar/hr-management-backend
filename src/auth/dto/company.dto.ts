import { IsAlphanumeric, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator"

export class companyDto{
    
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(8,24)
    password: string

    @IsString()
    @IsNotEmpty()
    @Length(5,24)
    companyName:string

    @IsNotEmpty()
    @IsString()
    companyPhoneNumber: string

    @IsNotEmpty()
    @IsString()
    companyAddress: string

    @IsNotEmpty()
    @IsEmail()
    picEmail: string

    @IsNotEmpty()
    @IsPhoneNumber("ID")
    picPhoneNumber: string
}