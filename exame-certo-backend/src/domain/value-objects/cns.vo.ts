import { CNSDto } from '../../application/shared/dtos/cns.dto';

export class CNS {
  private readonly cns: string;

  constructor(cns: string) {
    if (!this.validateCNS(cns)) {
      throw new Error('Invalid CNS');
    }

    this.cns = cns;
  }

  get value(): string {
    return this.cns;
  }

  validateCNS(cns: string): boolean {
    return true;
  }

  static fromDto(cns: CNSDto): CNS {
    return new CNS(cns.cns);
  }
}
