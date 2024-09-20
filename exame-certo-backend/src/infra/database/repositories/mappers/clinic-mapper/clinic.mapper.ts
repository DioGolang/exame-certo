import { ClinicEntity } from '../../../postgres/entities/clinic.entity';
import { Clinic } from '../../../../../domain/entities/clinic.entity';
import { Inject, Injectable } from '@nestjs/common';
import { BaseMapper } from '../base.mapper';
import { BuilderFactory } from '../../../../../domain/builders/builder.factory';
import { AddressMapper } from '../address.mapper';
import { ClinicMappingFactoryImpl } from '../../../../../application/mappers/clinic-mapper-factory/clinic-mapping.factory';

@Injectable()
export class ClinicMapper extends BaseMapper<Clinic, ClinicEntity> {
  constructor(
    @Inject('BuilderFactory') builder: BuilderFactory,
    private readonly addressMapper: AddressMapper,
    // private readonly clinicMappingFactory: ClinicMappingFactoryImpl,
  ) {
    super(builder);
  }

  public async toDomain(entity: ClinicEntity): Promise<Clinic> {
    const builder = await this.builder.createClinicBuilder(entity.id);
    const addressDto = this.addressMapper.toDto(entity.address);

    builder
      .withName(entity.name)
      .withEmail(entity.email)
      .withAddress(addressDto)
      .withContactInfo(entity.contactInfo);

    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);

    // const { anamnesis, exams, patients, doctors } =
    //   await this.clinicMappingFactory.mapRelationshipsToDomain(entity);

    // builder
    //   .withAnamnesis(anamnesis)
    //   .withExams(exams)
    //   .withPatients(patients)
    //   .withDoctors(doctors);

    return builder.build();
  }

  public async toPersistence(domain: Clinic): Promise<ClinicEntity> {
    const entity = new ClinicEntity();
    BaseMapper.setCommonFieldsToPersistence(entity, domain);
    BaseMapper.setFieldsToPersistence(entity, domain, [
      'name',
      'email',
      'address',
      'contactInfo',
    ]);

    // const { anamnesis, exams, patients, doctors } =
    //   await this.clinicMappingFactory.mapRelationshipsToPersistence(domain);

    // entity.anamnesis = anamnesis;
    // entity.exams = exams;
    // entity.patients = patients;
    // entity.doctors = doctors;

    return entity;
  }
}
