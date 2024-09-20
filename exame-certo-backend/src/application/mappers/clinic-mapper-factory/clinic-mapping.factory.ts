import { Clinic } from '../../../domain/entities/clinic.entity';
import { ClinicEntity } from '../../../infra/database/postgres/entities/clinic.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { MapperFacade } from '../mapper-facade/mapper-facade';
import { MapperFactory } from '../mapper-factory.interface';

@Injectable()
export class ClinicMappingFactoryImpl
  implements MapperFactory<ClinicEntity, Clinic>
{
  constructor(
    @Inject(forwardRef(() => MapperFacade))
    private readonly mapperFacade: MapperFacade,
  ) {}
  async mapRelationshipsToDomain(entity: ClinicEntity): Promise<any> {
    const [anamnesis, exams, patients, doctors] = await Promise.all([
      this.mapperFacade.mapAnamnesisToDomain(entity.anamnesis ?? []),
      this.mapperFacade.mapExamsToDomain(entity.exams ?? []),
      this.mapperFacade.mapPatientsToDomain(entity.patients ?? []),
      this.mapperFacade.mapDoctorsToDomain(entity.doctors ?? []),
    ]);

    return {
      anamnesis,
      exams,
      patients,
      doctors,
    };
  }
  async mapRelationshipsToPersistence(domain: Clinic): Promise<any> {
    const [anamnesisEntities, examEntities, patientEntities, doctorsEntities] =
      await Promise.all([
        this.mapperFacade.mapAnamnesisToPersistence(domain.anamnesis ?? []),
        this.mapperFacade.mapExamsToPersistence(domain.exams ?? []),
        this.mapperFacade.mapPatientsToPersistence(domain.patients ?? []),
        this.mapperFacade.mapDoctorsToPersistence(domain.doctors ?? []),
      ]);

    return {
      anamnesisEntities,
      examEntities,
      patientEntities,
      doctorsEntities,
    };
  }
}
