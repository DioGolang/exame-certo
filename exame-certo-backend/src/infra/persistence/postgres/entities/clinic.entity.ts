import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';
import { Address } from '../../../../domain/value-objects/address.vo';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';
import { ExamEntity } from './exam.entity';
import { AnamnesisEntity } from './anamnesis.entity';
import { AttendantEntity } from './attendant.entity';
import { NursingEntity } from './nursing.entity';
import { Service } from '../../mongodb/schemas/service.schema';
import { ServiceEntity } from './service.entity';

@Entity('clinics')
export class ClinicEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column('jsonb')
  address: Address;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @OneToOne(() => AttendantEntity, (attendant) => attendant.clinic)
  attendant: AttendantEntity;

  @OneToMany(() => ExamEntity, (exam) => exam.clinic)
  exams: ExamEntity[];

  @OneToMany(() => AnamnesisEntity, (anamnesis) => anamnesis.clinic, {
    lazy: true,
  })
  anamnesis: AnamnesisEntity[];

  @OneToMany(() => ServiceEntity, (service) => service.clinic)
  services: Service[];

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.clinics, { lazy: true })
  doctors: DoctorEntity[];

  @ManyToMany(() => PatientEntity, (patient) => patient.clinics, { lazy: true })
  patients: PatientEntity[];

  @ManyToMany(() => NursingEntity, (nursing) => nursing.clinics, { lazy: true })
  nursing: NursingEntity[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
