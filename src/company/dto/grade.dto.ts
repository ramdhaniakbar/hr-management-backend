import { IsNotEmpty, IsString } from 'class-validator';

export class GradeDto {
  @IsNotEmpty()
  @IsString()
  gradeName: string;
}
