import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/factories/build/builder.factory';
import { Clinic } from '../../../domain/entities/clinic.entity';
import { ClinicProps } from '../../../domain/interfaces/props/clinic-props.interface';
import { ClinicBuilder } from '../../../domain/builders/clinic.builder';

@Injectable()
export class ClinicRelationshipMapper {
  constructor(
    @Inject('ClinicBuilderFactory')
    private readonly clinicBuilderFactory: BuilderFactory<
      Clinic,
      ClinicProps,
      ClinicBuilder
    >,
  ) {}

  // mapWithPatients(clinicEntity: ClinicEntity, patientEntity: PatientEntity[]): Clinic {
  //   const clinicDomain = this.mapToDomain(clinicEntity);
  //   const patientsDomain = patientEntities.map(patient => new PatientDomain(/* ... */));
  //   clinicDomain.setPatients(patientsDomain);
  //   return clinicDomain;
  // }
}
