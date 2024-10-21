import { IsString } from 'class-validator';
import { UniqueField } from '../validators/unique-field.decorator';

export class CNSDto {
  @UniqueField('fieldUniqueForPatient', 'uniqueCns', {
    message: 'CNS já cadastrado.',
  })
  @IsString()
  cns: string;
}
