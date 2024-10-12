import { PersistenceFactory } from './persistence-factory.interface';
import { ClinicEntity } from '../../../infra/persistence/postgres/entities/clinic.entity';
import { Clinic as ClinicDocument } from '../../../infra/persistence/mongodb/schemas/clinic.schema';
import { Clinic } from '../../entities/clinic.entity';
import { Injectable } from '@nestjs/common';
import { ContactInfoMapper } from '../../../application/shared/mappers/contact-info.mapper';
import { AddressMapper } from '../../../application/shared/mappers/address.mapper';

@Injectable()
export class ClinicPersistenceFactory
  implements PersistenceFactory<ClinicEntity, ClinicDocument, Clinic>
{
  createEntity(): ClinicEntity {
    return new ClinicEntity();
  }
  configurePersistence(persistence: ClinicEntity, data: Clinic): ClinicEntity {
    persistence.id = data.id;
    persistence.name = data.name;
    persistence.email = data.email;
    persistence.passwordHash = data['_passwordHash'];
    persistence.address = data.address;
    persistence.contactInfo = data.contactInfo;
    persistence.createdAt = data.createdAt;
    persistence.updatedAt = data.updatedAt;
    return persistence;
  }
  createDocument(): ClinicDocument {
    return new ClinicDocument();
  }
  configureDocument(document: ClinicDocument, data: Clinic): ClinicDocument {
    document.id = data.id;
    document.name = data.name;
    document.email = data.email;
    document.passwordHash = data['_passwordHash'];
    document.address = AddressMapper.toDocument(data.address);
    document.contactInfo = ContactInfoMapper.toDocument(data.contactInfo);
    document.createdAt = data.createdAt;
    document.updatedAt = data.updatedAt;
    return document;
  }
}
