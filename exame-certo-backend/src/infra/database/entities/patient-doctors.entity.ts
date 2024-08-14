import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';

@Entity('patient_doctors')
export class PatientDoctorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenant_id: string;

  @ManyToOne(() => PatientEntity, patient => patient.doctors)
  patient: PatientEntity;

  @ManyToOne(() => DoctorEntity, doctor => doctor.patients)
  doctor: DoctorEntity;

  @Column({ default: true })
  authorized: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  authorizedAt: Date;
}
