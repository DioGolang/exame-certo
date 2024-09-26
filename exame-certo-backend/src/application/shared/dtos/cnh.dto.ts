import { IsString } from 'class-validator';

export class CNHDto {
  @IsString()
  cnh: string;
}
