import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator"

export class companyDto{
    
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
    
    @IsOptional()
    @IsString()
    companyLogo: string
    
    @IsNotEmpty()
    @IsEmail()
    picEmail: string

    @IsNotEmpty()
    @IsPhoneNumber("ID")
    picPhoneNumber: string

}
