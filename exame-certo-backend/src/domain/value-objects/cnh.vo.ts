import { CNHDto } from '../../application/shared/dtos/cnh.dto';

export class CNH {
  private readonly cnh;
  // private readonly expirationDate: Date;
  constructor(cnh: string) {
    if (!this.validateCNH(cnh)) {
      throw new Error('Invalid cnh');
    }
    this.cnh = cnh;
  }

  get value(): string {
    return this.cnh;
  }

  private validateCNH(cnh: string): boolean {
    return true;
  }

  static fromDto(cnh: CNHDto): CNH {
    return new CNH(cnh.cnh);
  }
}

//   number: cnh.number,
//   expirationDate: cnh.expirationDate,
//   category: cnh.category,
//   register: cnh.register,
//   state: cnh.state
