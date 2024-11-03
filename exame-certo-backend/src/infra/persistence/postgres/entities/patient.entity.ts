import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Address } from '../../../../domain/value-objects/address.vo';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';
import { SocioEconomicInformation } from '../../../../domain/value-objects/socio-economic-information.vo';
import { Sex } from '../../../../domain/enums/sex.enum';
import { MaritalStatus } from '../../../../domain/enums/marital-status.enum';
import { ExamEntity } from './exam.entity';

import { ClinicEntity } from './clinic.entity';
import { AnamnesisEntity } from './anamnesis.entity';
import { Documentation } from '../../../../domain/value-objects/documentation.vo';
import { ServiceEntity } from './service.entity';
import { ScreeningEntity } from './screening.entity';
import { SchedulingEntity } from './scheduling.entity';

@Entity('patients')
export class PatientEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: Sex })
  sex: Sex;

  @Column({ type: 'enum', enum: MaritalStatus })
  maritalStatus: MaritalStatus;

  @Column('jsonb')
  address: Address;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @Column('jsonb')
  documentation: Documentation;

  @Column('jsonb')
  socioeconomicInformation: SocioEconomicInformation;

  @Column({ nullable: true })
  healthInsurance?: string;

  @OneToMany(() => AnamnesisEntity, (anamnesis) => anamnesis.patient, {
    lazy: true,
  })
  anamnesis: AnamnesisEntity[];

  @OneToMany(() => ExamEntity, (exam) => exam.patient, { lazy: true })
  exams: ExamEntity[];

  @OneToMany(() => SchedulingEntity, (scheduling) => scheduling.patient, {
    lazy: true,
  })
  scheduling: SchedulingEntity[];

  @ManyToMany(() => ClinicEntity, (clinic) => clinic.patients)
  clinics: ClinicEntity[];

  @OneToOne(() => ServiceEntity, (service) => service.patient)
  @JoinColumn()
  service: ServiceEntity;

  @OneToOne(() => ScreeningEntity, (screening) => screening.patient)
  @JoinColumn()
  screening: ScreeningEntity;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
