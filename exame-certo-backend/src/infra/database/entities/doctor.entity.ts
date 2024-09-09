import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../../../domain/value-objects/address.vo';
import { ContactInfo } from '../../../domain/value-objects/contact-info.vo';
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
  professionalAddress: Address;

  @Column()
  registrationNumber: string;

  @Column()
  specialization: string;

  @OneToMany(() => AnamnesisEntity, (anamnesis) => anamnesis.doctor)
  anamnesis: AnamnesisEntity[];

  @OneToMany(() => ExamEntity, (exam) => exam.doctor)
  exams: ExamEntity[];

  @OneToMany(() => ReportEntity, (report) => report.doctor)
  reports: ReportEntity[];

  @ManyToMany(() => ClinicEntity, (clinic) => clinic.doctors)
  clinics: ClinicEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;
}
