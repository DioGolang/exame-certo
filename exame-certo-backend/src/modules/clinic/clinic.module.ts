import { Module } from '@nestjs/common';
import { ClinicRepositoryImpl } from '../../infra/database/repositories/clinic.repository.impl';
import { CqrsModule } from '@nestjs/cqrs';
import { ClinicService } from '../../application/services/clinic.service';
import { CreateClinicHandler } from '../../application/handlers/create-clinic.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicEntity } from '../../infra/database/entities/clinic.entity';
import { ClinicMapper } from '../../application/mappers/clinic.mapper';
import { DefaultBuilderFactory } from '../../domain/builders/default-builder.factory';
import { AddressMapper } from '../../infra/database/repositories/mappers/address.mapper';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ClinicEntity])],
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
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
  ],
  exports: [ClinicService],
})
export class ClinicModule {}
