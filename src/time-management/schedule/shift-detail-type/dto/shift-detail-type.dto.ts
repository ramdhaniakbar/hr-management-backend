import { IsBoolean, IsDate, IsDateString, IsMongoId, IsNotEmpty, IsString, Length } from "class-validator";
import { Date, ObjectId } from "mongoose";
import { BreakType } from "../../break-type/break-type.model";

export class shiftDetailTypeDto{
    
    @IsString()
    @IsNotEmpty()
    shiftName: string;

    @IsNotEmpty()
    @IsDateString()
    in: string;

    @IsNotEmpty()
    @IsDateString()
    out: string;

    @IsNotEmpty()
    @IsDateString()
    breakIn: string;

    @IsNotEmpty()
    @IsDateString()
    breakOut: string;

    @IsNotEmpty()
    @IsDateString()
    otBefore: string;

    @IsNotEmpty()
    @IsDateString()
    otAfter: string;

    @IsNotEmpty()
    @IsMongoId()
    breakType: string;

    @IsNotEmpty()
    @IsBoolean()
    hideInRequest: boolean;


}