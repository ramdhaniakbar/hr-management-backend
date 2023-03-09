import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, ValidateIf } from "class-validator";
import { blood, genders, marital, religion } from "src/enum";

export class PersonalDataDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @Length(10,13)
    @IsPhoneNumber("ID")
    @IsNotEmpty()
    @IsOptional()
    mobilePhoneNo: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(10,13)
    @IsPhoneNumber("ID")
    @IsNotEmpty()
    @IsOptional()
    phoneNo: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    placeOfBirth: string;

    @IsNotEmpty()
    @IsString()
    @IsDateString()
    birthDate: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(genders)
    @ValidateIf((object,value) => value !== undefined )
    gender: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(marital)
    maritalStatus:string

    @IsNotEmpty()
    @IsString()
    @IsEnum(blood)
    @ValidateIf((object,value) => value !== undefined )
    bloodType: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(religion)
    religion: string
}