import { Mapper } from '../../interfaces/mapper.interface';
import { Nursing } from '../../../domain/entities/nursing.entity';
import { NursingEntity } from '../../../infra/persistence/postgres/entities/nursing.entity';
import { Nursing as NursingDocument } from '../../../infra/persistence/mongodb/schemas/nursing.schema';
import { RegisterNursingEventDto } from '../dto/register-nursing-event.dto';
import { Document, Types } from 'mongoose';
import { Inject } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/factories/build/builder.factory';
import { NursingProps } from '../../../domain/interfaces/props/nursing-props.interface';
import { NursingBuilder } from '../../../domain/builders/nursing.builder';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory.interface';

export class NursingMapper
  implements
    Mapper<Nursing, NursingEntity, NursingDocument, RegisterNursingEventDto>
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

  toRegisteredDomainEventDto(domain: Nursing): RegisterNursingEventDto {
    throw new Error('Method not implemented.');
  }
  fromEventDtoToDomain(dto: RegisterNursingEventDto): Promise<Nursing> {
    throw new Error('Method not implemented.');
  }
  toDomain(entity: NursingEntity): Promise<Nursing> {
    throw new Error('Method not implemented.');
  }
  toPersistence(domain: Nursing): NursingEntity {
    throw new Error('Method not implemented.');
  }
  toDocument(
    domain: Nursing,
  ): Document<unknown, {}, Nursing> & Nursing & { _id: Types.ObjectId } {
    throw new Error('Method not implemented.');
  }
  documentForDomain(
    document: Document<unknown, {}, Nursing> &
      Nursing & { _id: Types.ObjectId },
  ): Promise<Nursing> {
    throw new Error('Method not implemented.');
  }
  fromRegisteredEntityEventDtoToDocument(
    event: RegisterNursingEventDto,
  ): Document<unknown, {}, Nursing> & Nursing & { _id: Types.ObjectId } {
    throw new Error('Method not implemented.');
  }
}
