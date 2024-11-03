import { config } from 'dotenv';
config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'node:process';
import { PatientEntity } from '../persistence/postgres/entities/patient.entity';
import { DoctorEntity } from '../persistence/postgres/entities/doctor.entity';
import { ClinicEntity } from '../persistence/postgres/entities/clinic.entity';
import { AnamnesisEntity } from '../persistence/postgres/entities/anamnesis.entity';
import { ExamEntity } from '../persistence/postgres/entities/exam.entity';
import { ReportEntity } from '../persistence/postgres/entities/report.entity';
import { DoctorClinicEntity } from '../persistence/postgres/entities/doctor-clinics.entity';
import { PatientClinicEntity } from '../persistence/postgres/entities/patient-clinics.entity';
import { OutboxEntity } from '../persistence/postgres/entities/outbox.entity';
import { ServiceEntity } from '../persistence/postgres/entities/service.entity';
import { AttendantEntity } from '../persistence/postgres/entities/attendant.entity';
import { NursingEntity } from '../persistence/postgres/entities/nursing.entity';
import { ScreeningEntity } from '../persistence/postgres/entities/screening.entity';
import { ProcedureEntity } from '../persistence/postgres/entities/procedure.entity';
import { SchedulingEntity } from '../persistence/postgres/entities/scheduling.entity';
import { ConsultationEntity } from '../persistence/postgres/entities/consultation.entity';

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
    NursingEntity,
    AttendantEntity,
    ClinicEntity,
    ConsultationEntity,
    ScreeningEntity,
    AnamnesisEntity,
    ExamEntity,
    ReportEntity,
    DoctorClinicEntity,
    PatientClinicEntity,
    OutboxEntity,
    ProcedureEntity,
    ServiceEntity,
    SchedulingEntity,
  ],
  migrations: ['src/infra/database/migrations/*.{js,ts}'],
  synchronize: true,
  logging: true,
};
