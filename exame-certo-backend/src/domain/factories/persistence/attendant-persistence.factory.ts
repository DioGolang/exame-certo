import { Injectable } from '@nestjs/common';
import { PersistenceFactory } from './persistence-factory.interface';
import { AttendantEntity } from '../../../infra/persistence/postgres/entities/attendant.entity';
import { Attendant as AttendantDocument } from '../../../infra/persistence/mongodb/schemas/attendant.schema';
import { Attendant } from '../../entities/attendant.entity';
import { AddressMapper } from '../../../application/shared/mappers/address.mapper';
import { ContactInfoMapper } from '../../../application/shared/mappers/contact-info.mapper';

@Injectable()
export class AttendantPersistenceFactory
  implements PersistenceFactory<AttendantEntity, AttendantDocument, Attendant>
{
  createEntity(): AttendantEntity {
    return new AttendantEntity();
  }
  configurePersistence(
    persistence: AttendantEntity,
    data: Attendant,
  ): AttendantEntity {
    persistence.id = data.id;
    persistence.name = data.name;
    persistence.email = data.email;
    persistence.passwordHash = data['_passwordHash'];
    persistence.department = data.department;
    persistence.address = data.address;
    persistence.contactInfo = data.contactInfo;
    persistence.createdAt = data.createdAt;
    persistence.updatedAt = data.updatedAt;
    return persistence;
  }
  createDocument(): AttendantDocument {
    return new AttendantDocument();
  }
  configureDocument(
    document: AttendantDocument,
    data: Attendant,
  ): AttendantDocument {
    document.id = data.id;
    document.name = data.name;
    document.email = data.email;
    document.passwordHash = data['_passwordHash'];
    document.department = data.department;
    document.address = AddressMapper.toDocument(data.address);
    document.contactInfo = ContactInfoMapper.toDocument(data.contactInfo);
    document.createdAt = data.createdAt;
    document.updatedAt = data.updatedAt;
    return document;
  }
}
