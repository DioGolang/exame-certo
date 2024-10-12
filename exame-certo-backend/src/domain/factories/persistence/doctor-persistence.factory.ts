import { Injectable } from '@nestjs/common';
import { PersistenceFactory } from './persistence-factory.interface';
import { DoctorEntity } from '../../../infra/persistence/postgres/entities/doctor.entity';
import { Doctor as DoctorDocument } from '../../../infra/persistence/mongodb/schemas/doctor.schema';
import { Doctor } from '../../entities/doctor.entity';
import { AddressMapper } from '../../../application/shared/mappers/address.mapper';
import { ContactInfoMapper } from '../../../application/shared/mappers/contact-info.mapper';

@Injectable()
export class DoctorPersistenceFactory
  implements PersistenceFactory<DoctorEntity, DoctorDocument, Doctor>
{
  createEntity(): DoctorEntity {
    return new DoctorEntity();
  }
  configurePersistence(persistence: DoctorEntity, data: Doctor): DoctorEntity {
    persistence.id = data.id;
    persistence.name = data.name;
    persistence.email = data.email;
    persistence.passwordHash = data['_passwordHash'];
    persistence.registrationNumber = data.registrationNumber;
    persistence.specialization = data.specialization;
    persistence.address = data.address;
    persistence.contactInfo = data.contactInfo;
    persistence.createdAt = data.createdAt;
    persistence.updatedAt = data.updatedAt;
    return persistence;
  }
  createDocument(): DoctorDocument {
    return new DoctorDocument();
  }
  configureDocument(document: DoctorDocument, data: Doctor): DoctorDocument {
    document.id = data.id;
    document.name = data.name;
    document.email = data.email;
    document.passwordHash = data['_passwordHash'];
    document.registrationNumber = data.registrationNumber;
    document.specialization = data.specialization;
    document.address = AddressMapper.toDocument(data.address);
    document.contactInfo = ContactInfoMapper.toDocument(data.contactInfo);
    document.createdAt = data.createdAt;
    document.updatedAt = data.updatedAt;
    return document;
  }
}
