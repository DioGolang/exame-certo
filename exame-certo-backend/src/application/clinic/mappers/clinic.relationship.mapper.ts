import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/builders/builder.factory';

@Injectable()
export class ClinicRelationshipMapper {
  constructor(
    @Inject('BuilderFactory')
    private readonly builderFactory: BuilderFactory,
  ) {}

  // mapWithPatients(clinicEntity: ClinicEntity, patientEntity: PatientEntity[]): Clinic {
  //   const clinicDomain = this.mapToDomain(clinicEntity);
  //   const patientsDomain = patientEntities.map(patient => new PatientDomain(/* ... */));
  //   clinicDomain.setPatients(patientsDomain);
  //   return clinicDomain;
  // }
}
