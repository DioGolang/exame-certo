import { CPF } from './cpf.vo';
import { RG } from './rg.vo';
import { CNH } from './cnh.vo';
import { CNS } from './cns.vo';
import { DocumentationDto } from '../../application/shared/dtos/documentation.dto';

export class Documentation {
  public readonly cpf: CPF;
  public readonly rg: RG;
  public readonly cnh?: CNH;
  public readonly cns?: CNS;

  constructor(cpf: CPF, rg: RG, cnh?: CNH, cns?: CNS) {
    this.cpf = cpf;
    this.rg = rg;
    this.cnh = cnh;
    this.cns = cns;
  }

  static fromDto(documentationDto: DocumentationDto): Documentation {
    return new Documentation(
      CPF.fromDto(documentationDto.cpf),
      RG.fromDto(documentationDto.rg),
      documentationDto.cnh ? CNH.fromDto(documentationDto.cnh) : undefined,
      documentationDto.cns ? CNS.fromDto(documentationDto.cns) : undefined,
    );
  }
}
