import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Address } from '../../../../domain/value-objects/address.vo';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';
import { ClinicEntity } from './clinic.entity';
import { ExamEntity } from './exam.entity';
import { AnamnesisEntity } from './anamnesis.entity';
import { ReportEntity } from './report.entity';

@Entity('doctors')
export class DoctorEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @Column('jsonb')
  address: Address;

  @Column()
  registrationNumber: string;

  @Column()
  specialization: string;

  @OneToMany(() => AnamnesisEntity, (anamnesis) => anamnesis.doctor, {
    lazy: true,
  })
  anamnesis: AnamnesisEntity[];

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
