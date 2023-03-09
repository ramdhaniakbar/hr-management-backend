import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsString, ValidateNested } from "class-validator"

class organizations{
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    organization: string
}

class jobLevels{

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    jobLevel: string
}


export class filters{

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => organizations)
    organization: organizations[]

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => jobLevels)
    jobLevel: jobLevels[]
}