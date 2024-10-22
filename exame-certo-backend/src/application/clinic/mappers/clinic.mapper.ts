import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEventDto } from '../dto/create-clinic-event.dto';
import { ClinicEntity } from '../../../infra/persistence/postgres/entities/clinic.entity';
import { Clinic as ClinicDocument } from '../../../infra/persistence/mongodb/schemas/clinic.schema';
import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/factories/build/builder.factory';
import { ClinicBuilder } from '../../../domain/builders/clinic.builder';
import { ClinicProps } from '../../../domain/interfaces/props/clinic-props.interface';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory.interface';
import { Mapper } from '../../interfaces/mapper.interface';

@Injectable()
export class ClinicMapper
  implements Mapper<Clinic, ClinicEntity, ClinicDocument, CreateClinicEventDto>
{
  constructor(
    @Inject('ClinicBuilderFactory')
    private readonly clinicBuilderFactory: BuilderFactory<
      Clinic,
      ClinicProps,
      ClinicBuilder
    >,
    @Inject('ClinicPersistenceFactory')
    private readonly clinicPersistenceFactory: PersistenceFactory<
      ClinicEntity,
      ClinicDocument,
      Clinic
    >,
  ) {}

  toRegisteredDomainEventDto(clinic: Clinic): CreateClinicEventDto {
    console.log(clinic['_password']);
    return {
      id: clinic.id,
      passwordHash: clinic['_passwordHash'],
      name: clinic.name,
      email: clinic.email,
      address: clinic.address,
      contactInfo: clinic.contactInfo,
      createdAt: clinic.createdAt,
      updatedAt: clinic.updatedAt,
    };
  }

  async fromEventDtoToDomain(
    createClinicEventDto: CreateClinicEventDto,
  ): Promise<Clinic> {
    const clinicBuilder = this.clinicBuilderFactory.createBuilder();
    this.clinicBuilderFactory.configureBuilder(
      clinicBuilder,
      createClinicEventDto,
    );
    return clinicBuilder.build();
  }

  async toDomain(clinicEntity: ClinicEntity): Promise<Clinic> {
    const clinicBuilder = this.clinicBuilderFactory.createBuilder();
    this.clinicBuilderFactory.configureBuilder(clinicBuilder, clinicEntity);
    return clinicBuilder.build();
  }

  toPersistence(clinic: Clinic): ClinicEntity {
    const clinicEntity = this.clinicPersistenceFactory.createEntity();
    this.clinicPersistenceFactory.configurePersistence(clinicEntity, clinic);
    return clinicEntity;
  }

  toDocument(clinic: Clinic): ClinicDocument {
    const clinicDocument = this.clinicPersistenceFactory.createDocument();
    this.clinicPersistenceFactory.configureDocument(clinicDocument, clinic);
    return clinicDocument;
  }

  async documentForDomain(clinicDocument: ClinicDocument): Promise<Clinic> {
    const clinicBuilder = this.clinicBuilderFactory.createBuilder();
    this.clinicBuilderFactory.configureBuilder(clinicBuilder, clinicDocument);
    console.log(clinicDocument);
    return clinicBuilder.build();
  }
}
