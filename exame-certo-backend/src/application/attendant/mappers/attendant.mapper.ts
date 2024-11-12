import { Inject, Injectable } from '@nestjs/common';
import { Mapper } from '../../interfaces/mapper.interface';
import { Attendant } from '../../../domain/entities/attendant.entity';
import { AttendantEntity } from '../../../infra/persistence/postgres/entities/attendant.entity';
import { Attendant as AttendantDocument } from '../../../infra/persistence/mongodb/schemas/attendant.schema';
import { RegisteredAttendantEventDto } from '../dto/registered-attendant-event.dto';
import { BuilderFactory } from '../../../domain/factories/build/builder.factory';
import { AttendantProps } from '../../../domain/interfaces/props/attendant-props.interface';
import { AttendantBuilder } from '../../../domain/builders/attendant.build';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory.interface';

@Injectable()
export class AttendantMapper
  implements
    Mapper<
      Attendant,
      AttendantEntity,
      AttendantDocument,
      RegisteredAttendantEventDto
    >
{
  constructor(
    @Inject('AttendantBuilderFactory')
    private readonly attendantBuilderFactory: BuilderFactory<
      Attendant,
      AttendantProps,
      AttendantBuilder
    >,
    @Inject('AttendantPersistenceFactory')
    private readonly attendantPersistenceFactory: PersistenceFactory<
      AttendantEntity,
      AttendantDocument,
      Attendant
    >,
  ) {}

  toRegisteredDomainEventDto(
    attendant: Attendant,
  ): RegisteredAttendantEventDto {
    return {
      id: attendant.id,
      name: attendant.name,
      email: attendant.email,
      passwordHash: attendant['_passwordHash'],
      department: attendant.department,
      address: attendant.address,
      contactInfo: attendant.contactInfo,
      createdAt: attendant.createdAt,
      updatedAt: attendant.updatedAt,
    };
  }

  fromEventDtoToDomain(dto: RegisteredAttendantEventDto): Promise<Attendant> {
    const attendantBuilder = this.attendantBuilderFactory.createBuilder();
    this.attendantBuilderFactory.configureBuilder(attendantBuilder, dto);
    return Promise.resolve(attendantBuilder.build());
  }

  async toDomain(attendantEntity: AttendantEntity): Promise<Attendant> {
    const attendantBuild = this.attendantBuilderFactory.createBuilder();
    this.attendantBuilderFactory.configureBuilder(
      attendantBuild,
      attendantEntity,
    );
    return attendantBuild.build();
  }

  toPersistence(attendant: Attendant): AttendantEntity {
    const attendantEntity = this.attendantPersistenceFactory.createEntity();
    this.attendantPersistenceFactory.configurePersistence(
      attendantEntity,
      attendant,
    );
    return attendantEntity;
  }

  toDocument(attendant: Attendant): AttendantDocument {
    const attendantDocument = this.attendantPersistenceFactory.createDocument();
    this.attendantPersistenceFactory.configureDocument(
      attendantDocument,
      attendant,
    );
    return attendantDocument;
  }

  async documentForDomain(document: AttendantDocument): Promise<Attendant> {
    const attendantBuilder = this.attendantBuilderFactory.createBuilder();
    this.attendantBuilderFactory.configureBuilder(attendantBuilder, document);
    return attendantBuilder.build();
  }

  fromRegisteredEntityEventDtoToDocument(
    dto: RegisteredAttendantEventDto,
  ): AttendantDocument {
    const attendantDocument = this.attendantPersistenceFactory.createDocument();
    attendantDocument.id = dto.id;
    attendantDocument.name = dto.name;
    attendantDocument.email = dto.email;
    attendantDocument.passwordHash = dto.passwordHash;
    attendantDocument.department = dto.department;
    attendantDocument.contactInfo = dto.contactInfo;
    attendantDocument.address = dto.address;
    attendantDocument.createdAt = dto.createdAt;
    attendantDocument.updatedAt = dto.updatedAt;
    return attendantDocument;
  }
}
