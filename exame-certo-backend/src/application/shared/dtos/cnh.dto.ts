import { IsString } from 'class-validator';
import { UniqueField } from '../validators/unique-field.decorator';

export class CNHDto {
  @UniqueField('fieldUniqueForPatient', 'uniqueCnh', {
    message: 'CNH já cadastrada.',
  })
  @IsString()
  cnh: string;
}
