import { CNH } from '../../../domain/value-objects/cnh.vo';
import { CNHDto } from '../dtos/cnh.dto';

export class CnhMapper {
  static toDto(cnh: CNH): CNHDto | null {
    if (!cnh) {
      return null;
    }
    return {
      cnh: cnh.value,
    };
  }
}
