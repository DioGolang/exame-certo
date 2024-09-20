import { forwardRef, Module } from '@nestjs/common';
import { ClinicMapperFactoryModule } from './clinic-mapper-factory/clinic-mapper-factory.module';
import { PatientMapperFactoryModule } from './patient-mapper-factory/patient-mapper-factory.module';
import { MapperFacadeModule } from './mapper-facade/mapper-facade.module';

@Module({
  imports: [
    forwardRef(() => ClinicMapperFactoryModule),
    forwardRef(() => PatientMapperFactoryModule),
    MapperFacadeModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationMappersModule {}
