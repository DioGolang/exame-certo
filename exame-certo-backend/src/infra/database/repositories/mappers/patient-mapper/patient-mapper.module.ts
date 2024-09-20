import { forwardRef, Module } from '@nestjs/common';
import { PatientMapper } from './patient.mapper';
import { DefaultBuilderFactory } from '../../../../../domain/builders/default-builder.factory';
import { DocumentationMapper } from '../document.mapper';
import { PatientMappingFactoryImpl } from '../../../../../application/mappers/patient-mapper-factory/patient-mapping.factory';
import { MapperFacadeModule } from '../../../../../application/mappers/mapper-facade/mapper-facade.module';

@Module({
  imports: [PatientMapperModule, forwardRef(() => MapperFacadeModule)],
  providers: [
    PatientMapper,
    DocumentationMapper,
    PatientMappingFactoryImpl,
    {
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
  ],
  exports: [PatientMapper],
})
export class PatientMapperModule {}
