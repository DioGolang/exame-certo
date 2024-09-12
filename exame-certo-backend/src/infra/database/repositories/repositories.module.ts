import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../typeorm.config';
import { PatientEntity } from '../entities/patient.entity';
import { ClinicEntity } from '../entities/clinic.entity';
import { DoctorEntity } from '../entities/doctor.entity';
import { ExamEntity } from '../entities/exam.entity';
import { AnamnesisEntity } from '../entities/anamnesis.entity';
import { ReportEntity } from '../entities/report.entity';
import { DoctorClinicEntity } from '../entities/doctor-clinics.entity';
import { ExamReportEntity } from '../entities/exam-report.entity';
import { PatientClinicEntity } from '../entities/patient-clinics.entity';
import { ClinicRepositoryImpl } from './clinic.repository.impl';

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
  ],
  providers: [
    {
      provide: 'ClinicRepository',
      useClass: ClinicRepositoryImpl,
    },
  ],
  exports: [TypeOrmModule, 'ClinicRepository'],
})
export class RepositoriesModule {}
