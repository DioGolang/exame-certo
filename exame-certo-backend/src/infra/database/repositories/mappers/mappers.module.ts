import { forwardRef, Module } from '@nestjs/common';
import { DefaultBuilderFactory } from '../../../../domain/builders/default-builder.factory';
import { AddressMapper } from './address.mapper';
import { AnamnesisMapper } from './anamnesis.mapper';
import { ExamMapper } from './exam.mapper';
import { ReportMapper } from './report.mapper';
import { ClinicMapperModule } from './clinic-mapper/clinic-mapper.module';
import { PatientMapperModule } from './patient-mapper/patient-mapper.module';
import { DoctorMapperModule } from './doctor-mapper/doctor-mapper.module';

@Module({
  imports: [
    forwardRef(() => ClinicMapperModule),
    forwardRef(() => PatientMapperModule),
    forwardRef(() => DoctorMapperModule),
  ],
  providers: [
    AddressMapper,
    AnamnesisMapper,
    ExamMapper,
    ReportMapper,
    {
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
  ],
  exports: [
    'BuilderFactory',
    AddressMapper,
    AnamnesisMapper,
    ExamMapper,
    ReportMapper,
  ],
})
export class MappersModule {}
