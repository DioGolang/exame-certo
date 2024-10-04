import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEventDto } from '../dto/create-clinic-event.dto';
import { ClinicEntity } from '../../../infra/persistence/postgres/entities/clinic.entity';
import { Clinic as ClinicDocument } from '../../../infra/persistence/mongodb/schemas/clinic.schema';
import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { AddressMapper } from '../../shared/mappers/address.mapper';
import { ContactInfoMapper } from '../../shared/mappers/contact-info.mapper';

@Injectable()
export class ClinicMapper {
  constructor(
    @Inject('BuilderFactory')
    private readonly builderFactory: BuilderFactory,
  ) {}

  toCreateClinicEventDto(clinic: Clinic): CreateClinicEventDto {
    return {
      id: clinic.id,
      password: clinic.password,
      name: clinic.name,
      email: clinic.email,
      address: clinic.address,
      contactInfo: clinic.contactInfo,
      createdAt: clinic.createdAt,
      updatedAt: clinic.updatedAt,
    };
  }

  async toDomain(clinicEntity: ClinicEntity): Promise<Clinic> {
    const clinicBuild = await this.builderFactory.createClinicBuilder(
      undefined,
      clinicEntity.password,
    );
    return clinicBuild
      .withName(clinicEntity.name)
      .withEmail(clinicEntity.email)
      .withAddress(clinicEntity.address)
      .withContactInfo(clinicEntity.contactInfo)
      .withCreatedAt(clinicEntity.createdAt)
      .withUpdatedAt(clinicEntity.updatedAt)
      .build();
  }

  toPersistence(clinic: Clinic): ClinicEntity {
    const clinicEntity = new ClinicEntity();
    clinicEntity.id = clinic.id;
    clinicEntity.password = clinic.password;
    clinicEntity.name = clinic.name;
    clinicEntity.email = clinic.email;
    clinicEntity.address = clinic.address;
    clinicEntity.contactInfo = clinic.contactInfo;
    clinicEntity.exams = [];
    clinicEntity.anamnesis = [];
    clinicEntity.doctors = [];
    clinicEntity.patients = [];
    clinicEntity.createdAt = clinic.createdAt;
    clinicEntity.updatedAt = clinic.updatedAt;
    return clinicEntity;
  }

  toDocument(clinic: Clinic): ClinicDocument {
    const clinicDocument = new ClinicDocument();
    clinicDocument.id = clinic.id;
    clinicDocument.password = clinic.password;
    clinicDocument.name = clinic.name;
    clinicDocument.email = clinic.email;
    clinicDocument.address = AddressMapper.toDocument(clinic.address);
    clinicDocument.contactInfo = ContactInfoMapper.toDocument(
      clinic.contactInfo,
    );
    clinicDocument.exams = [];
    clinicDocument.anamnesis = [];
    clinicDocument.doctors = [];
    clinicDocument.patients = [];
    clinicDocument.createdAt = clinic.createdAt;
    clinicDocument.updatedAt = clinic.updatedAt;
    return clinicDocument;
  }
}
