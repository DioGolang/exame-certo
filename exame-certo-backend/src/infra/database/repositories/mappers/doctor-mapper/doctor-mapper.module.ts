import { Module } from '@nestjs/common';
import { DoctorMapper } from './doctor.mapper';
import { DefaultBuilderFactory } from '../../../../../domain/builders/default-builder.factory';

@Module({
  imports: [],
  providers: [
    DoctorMapper,
    {
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
  ],
  exports: [DoctorMapper],
})
export class DoctorMapperModule {}
