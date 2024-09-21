import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../typeorm.config';
import { PatientEntity } from '../postgres/entities/patient.entity';
import { ClinicEntity } from '../postgres/entities/clinic.entity';
import { DoctorEntity } from '../postgres/entities/doctor.entity';
import { ExamEntity } from '../postgres/entities/exam.entity';
import { AnamnesisEntity } from '../postgres/entities/anamnesis.entity';
import { ReportEntity } from '../postgres/entities/report.entity';
import { DoctorClinicEntity } from '../postgres/entities/doctor-clinics.entity';
import { ExamReportEntity } from '../postgres/entities/exam-report.entity';
import { PatientClinicEntity } from '../postgres/entities/patient-clinics.entity';
import { ClinicRepositoryImpl } from './clinic.repository.impl';
import { ClinicMapper } from './mappers/clinic-mapper/clinic.mapper';
import { MappersModule } from './mappers/mappers.module';
import { DefaultBuilderFactory } from '../../../domain/builders/default-builder.factory';
import { AddressMapper } from './mappers/address.mapper';
import { ClinicReadRepositoryModule } from './mongodb/clinic-read-repository/clinic-read-repository.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      PatientEntity,
      ClinicEntity,
      DoctorEntity,
      ExamEntity,
      AnamnesisEntity,
      ReportEntity,
      DoctorClinicEntity,
      ExamReportEntity,
      PatientClinicEntity,
    ]),
    MappersModule,
    forwardRef(() => ClinicReadRepositoryModule),
  ],
  providers: [
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
  exports: [
    TypeOrmModule,
    'ClinicRepository',
    'BuilderFactory',
    'ClinicReadRepository',
  ],
})
export class RepositoriesModule {}
