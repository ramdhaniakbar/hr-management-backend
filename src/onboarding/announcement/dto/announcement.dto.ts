import { Type } from "class-transformer"
import {   ArrayMinSize, IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { ValidateObjectId } from "src/users/pipes/validate-object-id.pipe"

class organization{

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    organization: string
}

export class AnnouncementDto{

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => organization)
    sendTo: organization[]
    
    @IsString()
    @IsNotEmpty()
    subject: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    attachment: string

    @IsBoolean()
    @IsNotEmpty()
    sendEmailNotification: boolean
}