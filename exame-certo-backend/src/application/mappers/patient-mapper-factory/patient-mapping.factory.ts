import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PatientEntity } from '../../../infra/database/postgres/entities/patient.entity';
import { Patient } from '../../../domain/entities/patient.entity';
import { MapperFacade } from '../mapper-facade/mapper-facade';
import { MapperFactory } from '../mapper-factory.interface';

@Injectable()
export class PatientMappingFactoryImpl
  implements MapperFactory<PatientEntity, Patient>
{
  constructor(
    @Inject(forwardRef(() => MapperFacade))
    private readonly mapperFacade: MapperFacade,
  ) {}
  async mapRelationshipsToDomain(entity: PatientEntity): Promise<any> {
    const [anamnesisArray, examArray, clinicArray] = await Promise.all([
      this.mapperFacade.mapAnamnesisToDomain(entity.anamnesis ?? []),
      this.mapperFacade.mapExamsToDomain(entity.exams ?? []),
      this.mapperFacade.mapClinicsToDomain(entity.clinics ?? []),
    ]);

    return { anamnesisArray, examArray, clinicArray };
  }

  async mapRelationshipsToPersistence(domain: Patient): Promise<any> {
    const [anamnesisEntities, examEntities, clinicEntities] = await Promise.all(
      [
        this.mapperFacade.mapAnamnesisToPersistence(domain.anamnesis ?? []),
        this.mapperFacade.mapExamsToPersistence(domain.exams ?? []),
        this.mapperFacade.mapClinicsToPersistence(domain.clinics ?? []),
      ],
    );

    return { anamnesisEntities, examEntities, clinicEntities };
  }
}
