import { IsString } from 'class-validator';
import { UniqueField } from '../validators/unique-field.decorator';

export class RGDto {
  @UniqueField('fieldUniqueForPatient', 'uniqueRg', {
    message: 'RG já cadastrado.',
  })
  @IsString()
  rg: string;
}
