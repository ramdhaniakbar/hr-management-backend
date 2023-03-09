import { IsEmpty, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class OrgDto{
    @IsOptional()
    @IsString()
    parent: string;
    
    @IsString()
    @IsNotEmpty()
    @Length(5,24)
    orgName: string

}