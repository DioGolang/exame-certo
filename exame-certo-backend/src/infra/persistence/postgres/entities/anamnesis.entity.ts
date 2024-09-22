import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Identification } from '../../../../domain/value-objects/identification.vo';
import { PersonalHistory } from '../../../../domain/value-objects/personal-history.vo';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';
import { ClinicEntity } from './clinic.entity';
import { Medicine } from '../../../../domain/value-objects/medicine.vo';

@Entity('anamnesis')
export class AnamnesisEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.anamnesis)
  patient: PatientEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.anamnesis)
  doctor: DoctorEntity;

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.anamnesis)
  clinic: ClinicEntity;

  @Column()
  date: Date;

  @Column('jsonb')
  identification: Identification;

  @Column()
  mainComplaint: string;

  @Column()
  historyOfPresentIllness: string;

  @Column()
  reviewOfSystems: string;

  @Column()
  pastMedicalHistory: string;

  @Column()
  familyHistory: string;

  @Column()
  socialHistory: string;

  @Column('jsonb')
  personalHistory: PersonalHistory;

  @Column('jsonb', { array: true })
  medicines: Medicine[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
