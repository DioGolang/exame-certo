import { CPF } from "./cpf.vo";
import { RG } from "./rg.vo";
import { CNH } from "./cnh.vo";
import { CNS } from "./cns.vo";
import { DocumentationDto } from "../../application/dtos/documentation.dto";

export class Documentation{

  public readonly cpf: CPF;
  public readonly rg: RG;
  public readonly cnh?: CNH
  public readonly cnsNumber?: CNS

  constructor(
    cpf: CPF,
    rg: RG,
    cnh?: CNH,
    cnsNumber?: CNS
  ) {
    this.cpf = cpf;
    this.rg = rg;
    this.cnh = cnh;
    this.cnsNumber = cnsNumber;
  }

  static fromDto(documentationDto: DocumentationDto): Documentation {
    return new Documentation(
      new CPF(documentationDto.cpf),
      new RG(documentationDto.rg),
      documentationDto.cnh ? new CNH(documentationDto.cnh) : undefined,
      documentationDto.cnsNumber ? new CNS(documentationDto.cnsNumber) : undefined
    )
  }

}