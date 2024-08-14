import { config } from 'dotenv';
config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from "node:process";
import { ReportEntity } from "./entities/report.entity";
import { ExamEntity } from "./entities/exam.entity";
import { AnamnesisEntity } from "./entities/anamnesis.entity";
import { ClinicEntity } from "./entities/clinic.entity";
import { DoctorEntity } from "./entities/doctor.entity";
import { PatientEntity } from "./entities/patient.entity";
import { DoctorClinicEntity } from "./entities/doctor-clinics.entity";
import { PatientClinicEntity } from "./entities/patient-clinics.entity";
import { PatientDoctorEntity } from "./entities/patient-doctors.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [PatientEntity, DoctorEntity, ClinicEntity, AnamnesisEntity, ExamEntity, ReportEntity, DoctorClinicEntity, PatientClinicEntity, PatientDoctorEntity ],
  migrations: ['src/infra/database/migrations/*.{js,ts}'],
  synchronize: true,
  logging: true,
};

