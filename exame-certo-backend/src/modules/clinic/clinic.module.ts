import { Module } from '@nestjs/common';
import { ClinicRepositoryImpl } from '../../infra/database/repositories/clinic.repository.impl';
import { CqrsModule } from '@nestjs/cqrs';
import { ClinicService } from '../../application/services/clinic.service';
import { CreateClinicHandler } from '../../application/commands/handlers/create-clinic.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicEntity } from '../../infra/database/postgres/entities/clinic.entity';
import { ClinicMapper } from '../../infra/database/repositories/mappers/clinic-mapper/clinic.mapper';
import { DefaultBuilderFactory } from '../../domain/builders/default-builder.factory';
import { AddressMapper } from '../../infra/database/repositories/mappers/address.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Clinic,
  ClinicSchema,
} from '../../infra/database/mongodb/schemas/clinic.schema';
import { ClinicReadRepositoryImpl } from '../../infra/database/repositories/mongodb/clinic-read-repository/clinic-read.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ClinicEntity]),
    MongooseModule.forFeature(
      [{ name: Clinic.name, schema: ClinicSchema }],
      'exame_certo',
    ),
  ],
  providers: [
    ClinicService,
    CreateClinicHandler,
    ClinicMapper,
    AddressMapper,
    {
      provide: 'ClinicRepository',
      useClass: ClinicRepositoryImpl,
    },
    {
      provide: 'ClinicReadRepository',
      useClass: ClinicReadRepositoryImpl,
    },
    {
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
  ],
  exports: [
    ClinicService,
    'ClinicRepository',
    'BuilderFactory',
    'ClinicReadRepository',
  ],
})
export class ClinicModule {}
