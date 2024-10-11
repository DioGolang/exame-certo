import { Inject, Injectable } from '@nestjs/common';
import { CreateDoctorEventDto } from '../dto/create-doctor-event.dto';
import { Doctor as DoctorDocument } from '../../../infra/persistence/mongodb/schemas/doctor.schema';
import { Doctor } from '../../../domain/entities/doctor.entity';
import { DoctorEntity } from '../../../infra/persistence/postgres/entities/doctor.entity';
import { AddressMapper } from '../../shared/mappers/address.mapper';
import { ContactInfoMapper } from '../../shared/mappers/contact-info.mapper';
import { DoctorBuilder } from '../../../domain/builders/doctor.builder';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { DoctorProps } from '../../../domain/interfaces/props/doctor-props.interface';

@Injectable()
export class DoctorMapper {
  constructor(
    @Inject('DoctorBuilderFactory')
    private readonly doctorBuilderFactory: BuilderFactory<
      Doctor,
      DoctorProps,
      DoctorBuilder
    >,
  ) {}

  toCreateDoctorEventDto(doctor: Doctor): CreateDoctorEventDto {
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
    const doctorEntity = new DoctorEntity();
    doctorEntity.id = doctor.id;
    doctorEntity.password = doctor.password;
    doctorEntity.name = doctor.name;
    doctorEntity.email = doctor.email;
    doctorEntity.registrationNumber = doctor.registrationNumber;
    doctorEntity.specialization = doctor.specialization;
    doctorEntity.address = doctor.address;
    doctorEntity.contactInfo = doctor.contactInfo;
    doctorEntity.exams = [];
    doctorEntity.anamnesis = [];
    doctorEntity.clinics = [];
    doctorEntity.createdAt = doctor.createdAt;
    doctorEntity.updatedAt = doctor.updatedAt;
    return doctorEntity;
  }

  toDocument(doctor: Doctor): DoctorDocument {
    const doctorDocument = new DoctorDocument();
    doctorDocument.id = doctor.id;
    doctorDocument.password = doctor.password;
    doctorDocument.name = doctor.name;
    doctorDocument.email = doctor.email;
    doctorDocument.registrationNumber = doctor.registrationNumber;
    doctorDocument.specialization = doctor.specialization;
    doctorDocument.address = AddressMapper.toDocument(doctor.address);
    doctorDocument.contactInfo = ContactInfoMapper.toDocument(
      doctor.contactInfo,
    );
    doctorDocument.exams = [];
    doctorDocument.anamnesis = [];
    doctorDocument.clinics = [];
    doctorDocument.createdAt = doctor.createdAt;
    doctorDocument.updatedAt = doctor.updatedAt;
    return doctorDocument;
  }
  async documentForDomain(doctorDocument: DoctorDocument): Promise<Doctor> {
    const doctorBuilder = this.doctorBuilderFactory.createBuilder();
    this.doctorBuilderFactory.configureBuilder(doctorBuilder, doctorDocument);
    return doctorBuilder.build();
  }
}
