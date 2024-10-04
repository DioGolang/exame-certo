import { CID10Dto } from '../dtos/cid10.dto';
import { CID10 } from '../../../domain/value-objects/cid.vo';

export class Cid10Mapper {
  static toDto(cid: CID10 | null): CID10Dto | null {
    if (!cid) {
      return null;
    }
    return {
      cod: cid.cod,
      description: cid.description,
    };
  }
}
