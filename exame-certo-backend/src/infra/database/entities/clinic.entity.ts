import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
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
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @Column('jsonb')
  address: Address;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @OneToMany(() => ExamEntity, (exam) => exam.clinic)
  exams: ExamEntity[];

  @OneToMany(() => AnamnesisEntity, (anamnesis) => anamnesis.clinic)
  anamnesis: AnamnesisEntity[];

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.clinics)
  doctors: DoctorEntity[];

  @ManyToMany(() => PatientEntity, (patient) => patient.clinics)
  patients: PatientEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;
}
