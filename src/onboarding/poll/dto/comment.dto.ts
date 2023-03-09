import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class commentDto{

    @IsMongoId()
    @IsNotEmpty()
    _id: string

    @IsString()
    @IsNotEmpty()
    comment: string

}