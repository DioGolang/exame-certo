import { IsString } from 'class-validator';
import { UniqueField } from '../validators/unique-field.decorator';

export class CPFDto {
  @UniqueField('fieldUniqueForPatient', 'uniqueCpf', {
    message: 'Cpf já cadastrado',
  })
  @IsString()
  cpf: string;
  // expirationDate: string;
}
