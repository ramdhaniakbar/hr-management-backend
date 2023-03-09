import { IsMongoId, IsNotEmpty } from 'class-validator';

export class overtimeDefaultDto {
  @IsMongoId()
  @IsNotEmpty()
  company: string;

  @IsMongoId()
  @IsNotEmpty()
  dayOff: string;

  @IsMongoId()
  @IsNotEmpty()
  nationalHoliday: string;

  @IsMongoId()
  @IsNotEmpty()
  workingDay: string;
}
