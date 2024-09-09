import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { DoctorEntity } from '../../entities/doctor.entity';
import { Doctor } from '../../../../domain/entities/doctor.entity';

export class DoctorMapper {
  public static async toDomain(entity: DoctorEntity): Promise<Doctor> {
    return MapperUtils.toDoctorDomain(entity);
  }

  public static async toPersistence(domain: Doctor): Promise<DoctorEntity> {
    return MapperUtils.toDoctorPersistence(domain);
  }
}
