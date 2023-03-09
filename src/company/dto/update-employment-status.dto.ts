import { IsAlphanumeric, IsBoolean, IsEmail, isNotEmpty, IsNotEmpty, IsString, Length } from "class-validator"
import { ObjectId } from "mongoose";

export class UpdateEmployeeStatusDto{

    @IsNotEmpty()
    _id: ObjectId;

    @IsString()
    @IsNotEmpty()
    statusName: string;

}