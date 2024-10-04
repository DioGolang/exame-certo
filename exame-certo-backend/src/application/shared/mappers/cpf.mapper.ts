import { CPF } from '../../../domain/value-objects/cpf.vo';
import { CPFDto } from '../dtos/cpf.dto';

export class CPFMapper {
  static toDto(cpf: CPF): CPFDto | null {
    if (!cpf) {
      return null;
    }

    return { cpf: cpf.value };
  }
}
