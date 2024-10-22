import { Documentation } from '../../../domain/value-objects/documentation.vo';
import { DocumentationDto } from '../dtos/documentation.dto';
import { CNSMapper } from './cns.mapper';
import { CPFMapper } from './cpf.mapper';
import { RGMapper } from './rg.mapper';
import { CnhMapper } from './cnh.mapper';
import { CPF } from '../../../domain/value-objects/cpf.vo';
import { RG } from '../../../domain/value-objects/rg.vo';
import { CNH } from '../../../domain/value-objects/cnh.vo';
import { CNS } from '../../../domain/value-objects/cns.vo';

export class DocumentationMapper {
  static mapToDto(documentation: Documentation): DocumentationDto {
    return {
      cpf: CPFMapper.toDto(documentation.cpf),
      rg: RGMapper.toDto(documentation.rg),
      cnh: CnhMapper.toDto(documentation.cnh),
      cns: CNSMapper.toDto(documentation.cns),
    };
  }

  static fromDomain(documentationDto: DocumentationDto): Documentation {
    return new Documentation(
      CPF.fromDto(documentationDto.cpf),
      RG.fromDto(documentationDto.rg),
      documentationDto.cnh ? CNH.fromDto(documentationDto.cnh) : undefined,
      documentationDto.cns ? CNS.fromDto(documentationDto.cns) : undefined,
    );
  }
}
