import { forwardRef, Module } from '@nestjs/common';
import { PatientMappingFactoryImpl } from './patient-mapping.factory';
import { MapperFacadeModule } from '../mapper-facade/mapper-facade.module';

@Module({
  imports: [forwardRef(() => MapperFacadeModule)],
  providers: [PatientMappingFactoryImpl],
  exports: [PatientMappingFactoryImpl],
})
export class PatientMapperFactoryModule {}
