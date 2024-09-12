import { ClinicEntity } from '../../entities/clinic.entity';
import { Clinic } from '../../../../domain/entities/clinic.entity';
import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClinicMapper {
  public async toDomain(entity: ClinicEntity): Promise<Clinic> {
    return MapperUtils.toClinicDomain(entity);
  }
  public async toPersistence(domain: Clinic): Promise<ClinicEntity> {
    return MapperUtils.toClinicPersistence(domain);
  }
}
