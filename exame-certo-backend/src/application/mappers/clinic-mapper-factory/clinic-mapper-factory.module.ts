import { forwardRef, Module } from '@nestjs/common';
import { ClinicMappingFactoryImpl } from './clinic-mapping.factory';
import { MapperFacadeModule } from '../mapper-facade/mapper-facade.module';

@Module({
  imports: [forwardRef(() => MapperFacadeModule)],
  providers: [ClinicMappingFactoryImpl],
  exports: [ClinicMappingFactoryImpl],
})
export class ClinicMapperFactoryModule {}
