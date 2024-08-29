import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../../../domain/value-objects/address.vo";
import { ContactInfo } from "../../../domain/value-objects/contact-info.vo";
import { SocioEconomicInformation } from "../../../domain/value-objects/socio-economic-information.vo";
import { Sex } from "../../../domain/enums/sex.enum";
import { MaritalStatus } from "../../../domain/enums/marital-status.enum";
import { ExamEntity } from "./exam.entity";
import { DoctorEntity } from "./doctor.entity";
import { ClinicEntity } from "./clinic.entity";
import { AnamnesisEntity } from "./anamnesis.entity";
import { Documentation } from "../../../domain/value-objects/documentation.vo";


@Entity('patients')
export class PatientEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email:string;

  @Column()
  passwordHash: string;

  @Column()
  dateOfBirth: Date;

  @Column('jsonb')
  sex: Sex;

  @Column('jsonb')
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

  @OneToMany(() => AnamnesisEntity, anamnesis => anamnesis.patient)
  anamnesis: AnamnesisEntity[];

  @OneToMany(() => ExamEntity, exam => exam.patient)
  exams: ExamEntity[];

  @ManyToMany(() => ClinicEntity, clinic => clinic.patients)
  clinics: ClinicEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}