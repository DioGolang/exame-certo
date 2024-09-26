import { CPFDto } from '../../application/shared/dtos/cpf.dto';

export class CPF {
  constructor(private readonly cpf: string) {
    if (!this.validateCPF(cpf)) {
      throw new Error('Invalid CPF');
    }
    this.cpf = cpf;
  }

  get value(): string {
    return this.cpf;
  }

  private validateCPF(cpf: string): boolean {
    return true;
  }

  static fromDto(cpf: CPFDto): CPF {
    return new CPF(cpf.cpf);
  }
}
