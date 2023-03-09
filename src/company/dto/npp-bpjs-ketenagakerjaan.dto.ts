import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { jkkRate } from '../enum';

export class NppBpjsKetenagakerjaanDto {
  @IsNotEmpty()
  @IsString()
  nppName: string;

  @IsNotEmpty()
  @IsNumber()
  nppNumber: number;

  @IsNotEmpty()
  @IsEnum(jkkRate)
  jkk: jkkRate;
}

