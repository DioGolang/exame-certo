import { Mapper } from '../../interfaces/mapper.interface';
import { Nursing } from '../../../domain/entities/nursing.entity';
import { NursingEntity } from '../../../infra/persistence/postgres/entities/nursing.entity';
import { Nursing as NursingDocument } from '../../../infra/persistence/mongodb/schemas/nursing.schema';
import { RegisteredNursingEventDto } from '../dto/registered-nursing-event.dto';
import { Inject } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/factories/build/builder.factory';
import { NursingProps } from '../../../domain/interfaces/props/nursing-props.interface';
import { NursingBuilder } from '../../../domain/builders/nursing.builder';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory.interface';

export class NursingMapper
  implements
    Mapper<Nursing, NursingEntity, NursingDocument, RegisteredNursingEventDto>
{
  constructor(
    @Inject('NursingBuilderFactory')
    private readonly nursingBuilderFactory: BuilderFactory<
      Nursing,
      NursingProps,
      NursingBuilder
    >,
    @Inject('NursingPersistenceFactory')
    private readonly nursingPersistenceFactory: PersistenceFactory<
      NursingEntity,
      NursingDocument,
      Nursing
    >,
  ) {}

  toRegisteredDomainEventDto(nursing: Nursing): RegisteredNursingEventDto {
    return {
      id: nursing.id,
      name: nursing.name,
      email: nursing.email,
      passwordHash: nursing['_passwordHash'],
      nursingLevel: nursing.nursingLevel,
      address: nursing.address,
      contactInfo: nursing.contactInfo,
      COREN: nursing.COREN,
      createdAt: nursing.createdAt,
      updatedAt: nursing.updatedAt,
    };
  }
  fromEventDtoToDomain(dto: RegisteredNursingEventDto): Promise<Nursing> {
    const nursingBuilder = this.nursingBuilderFactory.createBuilder();
    this.nursingBuilderFactory.configureBuilder(nursingBuilder, dto);
    return Promise.resolve(nursingBuilder.build());
  }
  toDomain(entity: NursingEntity): Promise<Nursing> {
    const nursingBuilder = this.nursingBuilderFactory.createBuilder();
    this.nursingBuilderFactory.configureBuilder(nursingBuilder, entity);
    return Promise.resolve(nursingBuilder.build());
  }
  toPersistence(domain: Nursing): NursingEntity {
    const nursingEntity = this.nursingPersistenceFactory.createEntity();
    this.nursingPersistenceFactory.configurePersistence(nursingEntity, domain);
    return nursingEntity;
  }
  toDocument(domain: Nursing): NursingDocument {
    const nursingDocument = this.nursingPersistenceFactory.createDocument();
    this.nursingPersistenceFactory.configureDocument(nursingDocument, domain);
    return nursingDocument;
  }
  async documentForDomain(document: NursingDocument): Promise<Nursing> {
    const nursingBuilder = this.nursingBuilderFactory.createBuilder();
    this.nursingBuilderFactory.configureBuilder(nursingBuilder, document);
    return nursingBuilder.build();
  }
  fromRegisteredEntityEventDtoToDocument(
    event: RegisteredNursingEventDto,
  ): NursingDocument {
    const nursingDocument = new NursingDocument();
    nursingDocument.id = event.id;
    nursingDocument.name = event.name;
    nursingDocument.email = event.email;
    nursingDocument.passwordHash = event.passwordHash;
    nursingDocument.nursingLevel = event.nursingLevel;
    nursingDocument.address = event.address;
    nursingDocument.contactInfo = event.contactInfo;
    nursingDocument.COREN = event.COREN;
    nursingDocument.createdAt = event.createdAt;
    nursingDocument.updatedAt = event.updatedAt;
    return nursingDocument;
  }
}
