import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { customFieldType } from '../enum';

export class ClassDto {
  @IsNotEmpty()
  @IsString()
  className: string;

  @IsNotEmpty()
  @IsNumber()
  from: number;

  @IsNotEmpty()
  @IsNumber()
  to: number;
}

