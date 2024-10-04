import { CNSDto } from '../dtos/cns.dto';
import { CNS } from '../../../domain/value-objects/cns.vo';

export class CNSMapper {
  static toDto(cns: CNS): CNSDto | null {
    if (!cns) {
      return null;
    }

    return {
      cns: cns.value,
    };
  }
}
