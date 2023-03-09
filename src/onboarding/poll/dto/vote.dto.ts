import { IsMongoId, IsNotEmpty } from "class-validator";

export class voteDto{

    @IsMongoId()
    @IsNotEmpty()
    _id: string
    
    @IsMongoId()
    @IsNotEmpty()
    pollOption: string
}