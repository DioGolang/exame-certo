import { PatientEntity } from '../../entities/patient.entity';
import { Patient } from '../../../../domain/entities/patient.entity';
import { MapperUtils } from '../../../../shared/utils/mapper.utils';

export class PatientMapper {
  public static async toDomain(entity: PatientEntity): Promise<Patient> {
    return MapperUtils.toPatientDomain(entity);
  }

  public static async toPersistence(domain: Patient): Promise<PatientEntity> {
    return MapperUtils.toPatientPersistence(domain);
  }
}
