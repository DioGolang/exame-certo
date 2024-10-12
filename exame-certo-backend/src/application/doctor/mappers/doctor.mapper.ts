import { Inject, Injectable } from '@nestjs/common';
import { CreateDoctorEventDto } from '../dto/create-doctor-event.dto';
import { Doctor as DoctorDocument } from '../../../infra/persistence/mongodb/schemas/doctor.schema';
import { Doctor } from '../../../domain/entities/doctor.entity';
import { DoctorEntity } from '../../../infra/persistence/postgres/entities/doctor.entity';
import { DoctorBuilder } from '../../../domain/builders/doctor.builder';
import { BuilderFactory } from '../../../domain/factories/build/builder.factory';
import { DoctorProps } from '../../../domain/interfaces/props/doctor-props.interface';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory.interface';
import { Mapper } from '../../interfaces/mapper.interface';

@Injectable()
export class DoctorMapper
  implements Mapper<Doctor, DoctorEntity, DoctorDocument, CreateDoctorEventDto>
{
  constructor(
    @Inject('DoctorBuilderFactory')
    private readonly doctorBuilderFactory: BuilderFactory<
      Doctor,
      DoctorProps,
      DoctorBuilder
    >,
    @Inject('DoctorPersistenceFactory')
    private readonly doctorPersistenceFactory: PersistenceFactory<
      DoctorEntity,
      DoctorDocument,
      Doctor
    >,
  ) {}

  fromEventDtoToDomain(dto: CreateDoctorEventDto): Promise<Doctor> {
    const doctorBuilder = this.doctorBuilderFactory.createBuilder();
    this.doctorBuilderFactory.configureBuilder(doctorBuilder, dto);
    return Promise.resolve(doctorBuilder.build());
  }

  toCreateDomainEventDto(doctor: Doctor): CreateDoctorEventDto {
    return {
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      password: doctor.password,
      registrationNumber: doctor.registrationNumber,
      specialization: doctor.specialization,
      address: doctor.address,
      contactInfo: doctor.contactInfo,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
  }

  async toDomain(doctorEntity: DoctorEntity): Promise<Doctor> {
    const doctorBuild = this.doctorBuilderFactory.createBuilder();
    this.doctorBuilderFactory.configureBuilder(doctorBuild, doctorEntity);
    return doctorBuild.build();
  }

  toPersistence(doctor: Doctor): DoctorEntity {
    const doctorEntity = this.doctorPersistenceFactory.createEntity();
    this.doctorPersistenceFactory.configurePersistence(doctorEntity, doctor);
    return doctorEntity;
  }

  toDocument(doctor: Doctor): DoctorDocument {
    const doctorDocument = this.doctorPersistenceFactory.createDocument();
    this.doctorPersistenceFactory.configureDocument(doctorDocument, doctor);
    return doctorDocument;
  }

  async documentForDomain(doctorDocument: DoctorDocument): Promise<Doctor> {
    const doctorBuilder = this.doctorBuilderFactory.createBuilder();
    this.doctorBuilderFactory.configureBuilder(doctorBuilder, doctorDocument);
    return doctorBuilder.build();
  }
}
