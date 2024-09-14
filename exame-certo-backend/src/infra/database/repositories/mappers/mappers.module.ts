import { Module } from '@nestjs/common';
import { ClinicMapper } from '../../../../application/mappers/clinic.mapper';
import { DefaultBuilderFactory } from '../../../../domain/builders/default-builder.factory';
import { AddressMapper } from './address.mapper';

@Module({
  imports: [],
  providers: [
    ClinicMapper,
    AddressMapper,
    {
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
    {
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
  ],
  exports: ['BuilderFactory'],
})
export class MappersModule {}
