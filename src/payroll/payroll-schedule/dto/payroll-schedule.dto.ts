import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class payrollScheduleDto{
    
    @IsNumber()
    @Min(1)
    @Max(28)
    @IsNotEmpty()
    payrollSchedule: number
}