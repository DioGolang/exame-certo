import { IsString } from 'class-validator';

export class CPFDto {
  @IsString()
  cpf: string;
  // expirationDate: string;
}
