import { IsNotEmpty } from "class-validator";

export class userProfile{

    @IsNotEmpty()
    profilePict: string
}