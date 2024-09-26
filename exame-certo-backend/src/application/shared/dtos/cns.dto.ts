import { IsString } from 'class-validator';

export class CNSDto {
  @IsString()
  cns: string;
}
