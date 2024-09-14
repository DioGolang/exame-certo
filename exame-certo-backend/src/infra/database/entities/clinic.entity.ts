import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { ContactInfo } from '../../../domain/value-objects/contact-info.vo';
import { Address } from '../../../domain/value-objects/address.vo';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';
import { ExamEntity } from './exam.entity';
import { AnamnesisEntity } from './anamnesis.entity';

@Entity('clinics')
export class ClinicEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('jsonb')
  address: Address;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @OneToMany(() => ExamEntity, (exam) => exam.clinic)
  exams: ExamEntity[];

  @OneToMany(() => AnamnesisEntity, (anamnesis) => anamnesis.clinic, {
    lazy: true,
  })
  anamnesis: AnamnesisEntity[];

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.clinics, { lazy: true })
  doctors: DoctorEntity[];

  @ManyToMany(() => PatientEntity, (patient) => patient.clinics, { lazy: true })
  patients: PatientEntity[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
