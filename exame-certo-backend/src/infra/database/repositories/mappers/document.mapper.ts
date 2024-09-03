import { DocumentationDto } from "../../../../application/dtos/documentation.dto";
import { Documentation } from "../../../../domain/value-objects/documentation.vo";

export class DocumentationMapper {
  static toDto(documentation: Documentation): DocumentationDto {
    return {
      cpf: documentation.cpf.toString(),
      rg: documentation.rg.toString(),
      cnh: documentation.cnh?.toString(),
      cnsNumber: documentation.cnsNumber?.toString(),
    };
  }

}
