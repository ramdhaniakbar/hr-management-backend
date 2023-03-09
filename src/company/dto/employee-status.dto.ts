import { IsAlphanumeric, IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class EmployeeStatusDto{

    @IsString()
    @IsNotEmpty()
    statusName: string;

    @IsBoolean()
    endDate: boolean;

}