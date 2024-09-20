import { forwardRef, Module } from '@nestjs/common';
import { MapperFacade } from './mapper-facade';
import { MappersModule } from '../../../infra/database/repositories/mappers/mappers.module';
import { PatientMapperModule } from '../../../infra/database/repositories/mappers/patient-mapper/patient-mapper.module';
import { ClinicMapperModule } from '../../../infra/database/repositories/mappers/clinic-mapper/clinic-mapper.module';

@Module({
  imports: [
    MappersModule,
    forwardRef(() => PatientMapperModule),
    forwardRef(() => ClinicMapperModule),
  ],
  providers: [MapperFacade],
  exports: [MapperFacade],
})
export class MapperFacadeModule {}
