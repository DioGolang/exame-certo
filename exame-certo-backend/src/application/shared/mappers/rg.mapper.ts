import { RG } from '../../../domain/value-objects/rg.vo';
import { RGDto } from '../dtos/rg.dto';

export class RGMapper {
  static toDto(rg: RG): RGDto | null {
    if (!rg) {
      return null;
    }
    return {
      rg: rg.value,
    };
  }
}
