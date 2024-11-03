import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Address } from '../../../../domain/value-objects/address.vo';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';
import { ClinicEntity } from './clinic.entity';
import { ExamEntity } from './exam.entity';
import { AnamnesisEntity } from './anamnesis.entity';
import { ReportEntity } from './report.entity';
import { SchedulingEntity } from './scheduling.entity';
import { ConsultationEntity } from './consultation.entity';

@Entity('doctors')
export class DoctorEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @Column('jsonb')
  address: Address;

  @Column({ unique: true })
  registrationNumber: string;

  @Column()
  specialization: string;

  @OneToMany(() => AnamnesisEntity, (anamnesis) => anamnesis.doctor, {
    lazy: true,
  })
  anamnesis: AnamnesisEntity[];

  @OneToMany(() => SchedulingEntity, (scheduling) => scheduling.doctor, {
    lazy: true,
  })
  scheduling: SchedulingEntity[];

  @OneToMany(() => ConsultationEntity, (consultation) => consultation.doctor, {
    lazy: true,
  })
  consultations: ConsultationEntity[];

  @OneToMany(() => ExamEntity, (exam) => exam.doctor, { lazy: true })
  exams: ExamEntity[];

  @OneToMany(() => ReportEntity, (report) => report.doctor, { lazy: true })
  reports: ReportEntity[];

  @ManyToMany(() => ClinicEntity, (clinic) => clinic.doctors)
  clinics: ClinicEntity[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
