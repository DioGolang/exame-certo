import { Documentation } from '../../../domain/value-objects/documentation.vo';
import { DocumentationDto } from '../dtos/documentation.dto';
import { CNSMapper } from './cns.mapper';
import { CPFMapper } from './cpf.mapper';
import { RGMapper } from './rg.mapper';
import { CnhMapper } from './cnh.mapper';

export class DocumentationMapper {
  static mapToDto(documentation: Documentation): DocumentationDto {
    return {
      cpf: CPFMapper.toDto(documentation.cpf),
      rg: RGMapper.toDto(documentation.rg),
      cnh: CnhMapper.toDto(documentation.cnh),
      cns: CNSMapper.toDto(documentation.cns),
    };
  }
}
