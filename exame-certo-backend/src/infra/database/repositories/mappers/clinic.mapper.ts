import { ClinicEntity } from '../../entities/clinic.entity';
import { Clinic } from '../../../../domain/entities/clinic.entity';
import { MapperUtils } from '../../../../shared/utils/mapper.utils';

export class ClinicMapper {
  public static async toDomain(entity: ClinicEntity): Promise<Clinic> {
    return MapperUtils.toClinicDomain(entity);
  }
  public static async toPersistence(domain: Clinic): Promise<ClinicEntity> {
    return MapperUtils.toClinicPersistence(domain);
  }
}
