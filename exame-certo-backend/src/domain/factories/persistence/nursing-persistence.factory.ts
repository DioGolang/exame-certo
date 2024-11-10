import { Injectable } from '@nestjs/common';
import { PersistenceFactory } from './persistence-factory.interface';
import { NursingEntity } from '../../../infra/persistence/postgres/entities/nursing.entity';
import { Nursing as NursingDocument } from '../../../infra/persistence/mongodb/schemas/nursing.schema';
import { AddressMapper } from '../../../application/shared/mappers/address.mapper';
import { ContactInfoMapper } from '../../../application/shared/mappers/contact-info.mapper';
import { Nursing } from '../../entities/nursing.entity';

@Injectable()
export class NursingPersistenceFactory
  implements PersistenceFactory<NursingEntity, NursingDocument, Nursing>
{
  createEntity(): NursingEntity {
    return new NursingEntity();
  }
  configurePersistence(
    persistence: NursingEntity,
    data: Nursing,
  ): NursingEntity {
    persistence.id = data.id;
    persistence.name = data.name;
    persistence.email = data.email;
    persistence.passwordHash = data['_passwordHash'];
    persistence.nursingLevel = data.nursingLevel;
    persistence.COREN = data.COREN;
    persistence.address = data.address;
    persistence.contactInfo = data.contactInfo;
    persistence.createdAt = data.createdAt;
    persistence.updatedAt = data.updatedAt;
    return persistence;
  }
  createDocument(): NursingDocument {
    return new NursingDocument();
  }
  configureDocument(document: NursingDocument, data: Nursing): NursingDocument {
    document.id = data.id;
    document.name = data.name;
    document.email = data.email;
    document.passwordHash = data['_passwordHash'];
    document.nursingLevel = data.nursingLevel;
    document.COREN = data.COREN;
    document.address = AddressMapper.toDocument(data.address);
    document.contactInfo = ContactInfoMapper.toDocument(data.contactInfo);
    document.createdAt = data.createdAt;
    document.updatedAt = data.updatedAt;
    return document;
  }
}
