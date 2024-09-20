import { Module } from '@nestjs/common';
import { ClinicMapper } from './clinic.mapper';
import { DefaultBuilderFactory } from '../../../../../domain/builders/default-builder.factory';
import { AddressMapper } from '../address.mapper';
import { ClinicMappingFactoryImpl } from '../../../../../application/mappers/clinic-mapper-factory/clinic-mapping.factory';

@Module({
  providers: [
    ClinicMapper,
    AddressMapper,
    {
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
  ],
  exports: [ClinicMapper, AddressMapper, 'BuilderFactory'],
})
export class ClinicMapperModule {}
