import { RGDto } from '../../application/shared/dtos/rg.dto';

export class RG {
  private readonly rg;
  // private readonly expirationDate: date ;
  constructor(rg: string) {
    if (!this.validateRG(rg)) {
      throw new Error('invalid RG');
    }
    this.rg = rg;
  }

  get value(): string {
    return this.rg;
  }

  private validateRG(rg: string) {
    return true;
  }

  static fromDto(rg: RGDto): RG {
    return new RG(rg.rg);
  }
}
