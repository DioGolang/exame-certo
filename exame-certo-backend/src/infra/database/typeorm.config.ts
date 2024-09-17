import { config } from 'dotenv';
config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'node:process';
import { ReportEntity } from './postgres/entities/report.entity';
import { ExamEntity } from './postgres/entities/exam.entity';
import { AnamnesisEntity } from './postgres/entities/anamnesis.entity';
import { ClinicEntity } from './postgres/entities/clinic.entity';
import { DoctorEntity } from './postgres/entities/doctor.entity';
import { PatientEntity } from './postgres/entities/patient.entity';
import { DoctorClinicEntity } from './postgres/entities/doctor-clinics.entity';
import { PatientClinicEntity } from './postgres/entities/patient-clinics.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    PatientEntity,
    DoctorEntity,
    ClinicEntity,
    AnamnesisEntity,
    ExamEntity,
    ReportEntity,
    DoctorClinicEntity,
    PatientClinicEntity,
  ],
  migrations: ['src/infra/database/migrations/*.{js,ts}'],
  synchronize: true,
  logging: true,
};
