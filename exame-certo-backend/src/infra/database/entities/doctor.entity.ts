import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../../../domain/value-objects/address.vo";
import { ContactInfo } from "../../../domain/value-objects/contact-info.vo";
import { PatientEntity } from "./patient.entity";
import { ClinicEntity } from "./clinic.entity";
import { ExamEntity } from "./exam.entity";
import { AnamnesisEntity } from "./anamnesis.entity";
import { ReportEntity } from "./report.entity";


@Entity('doctors')
export class DoctorEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email:string;

  @Column()
  passwordHash: string;

  @Column('jsonb')
  address: Address;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @Column()
  registrationNumber: string;

  @Column()
  specialization: string;

  @OneToMany(() => AnamnesisEntity, anamnesis => anamnesis.doctor)
  anamnesis: AnamnesisEntity[];

  @OneToMany(() => ExamEntity, exam => exam.doctor)
  exams: ExamEntity[];

  @OneToMany(() => ReportEntity, report => report.doctor)
  reports: ReportEntity[];

  @ManyToMany(() => ClinicEntity, clinic => clinic.doctors)
  clinics: ClinicEntity[];

}