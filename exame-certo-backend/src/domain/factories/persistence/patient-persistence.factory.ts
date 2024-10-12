import { Injectable } from '@nestjs/common';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';
import { Patient } from '../../entities/patient.entity';
import { PatientEntity } from '../../../infra/persistence/postgres/entities/patient.entity';
import { PersistenceFactory } from './persistence-factory.interface';
import { AddressMapper } from '../../../application/shared/mappers/address.mapper';
import { ContactInfoMapper } from '../../../application/shared/mappers/contact-info.mapper';

@Injectable()
export class PatientPersistenceFactory
  implements PersistenceFactory<PatientEntity, PatientDocument, Patient>
{
  createEntity(): PatientEntity {
    return new PatientEntity();
  }
  configurePersistence(
    persistence: PatientEntity,
    data: Patient,
  ): PatientEntity {
    persistence.id = data.id;
    persistence.name = data.name;
    persistence.email = data.email;
    persistence.password = data.password;
    persistence.address = data.address;
    persistence.contactInfo = data.contactInfo;
    persistence.createdAt = data.createdAt;
    persistence.updatedAt = data.updatedAt;
    return persistence;
  }
  createDocument(): PatientDocument {
    return new PatientDocument();
  }
  configureDocument(document: PatientDocument, data: Patient): PatientDocument {
    document.id = data.id;
    document.name = data.name;
    document.email = data.email;
    document.passwordHash = data.password;
    document.address = AddressMapper.toDocument(data.address);
    document.contactInfo = ContactInfoMapper.toDocument(data.contactInfo);
    document.createdAt = data.createdAt;
    document.updatedAt = data.updatedAt;
    return document;
  }
}
