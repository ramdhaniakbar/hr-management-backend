import { IsAlphanumeric, IsNotEmpty, Length } from "class-validator"

export class passwordDto{

    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(8,24)
    password: string

}