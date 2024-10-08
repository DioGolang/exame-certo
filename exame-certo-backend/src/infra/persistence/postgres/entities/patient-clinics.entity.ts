import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PatientEntity } from './patient.entity';
import { ClinicEntity } from './clinic.entity';

@Entity('patient_clinics')
export class PatientClinicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.clinics)
  patient: PatientEntity;

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.patients)
  clinic: ClinicEntity;

  @Column({ default: true })
  authorized: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  authorizedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;
}
