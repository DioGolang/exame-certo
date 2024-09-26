import { IsString } from 'class-validator';

export class RGDto {
  @IsString()
  rg: string;
}
