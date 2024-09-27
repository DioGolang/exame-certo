import { IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class EmailDto {
  @IsEmail()
  @Expose()
  email: string;
}
