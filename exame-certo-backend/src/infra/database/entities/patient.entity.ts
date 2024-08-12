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


@Entity('patients')
export class PatientEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

  @Column()
  identificationNumber: string;

  @Column('jsonb')
  socioeconomicInformation: SocioEconomicInformation;

  @Column({ nullable: true })
  cnsNumber?: string;

  @Column({ nullable: true })
  healthInsurance?: string;

  @OneToMany(() => ExamEntity, exam => exam.patient)
  exams: ExamEntity[];

  @ManyToOne(() => DoctorEntity, doctor => doctor.patients)
  doctor: DoctorEntity;

  @ManyToMany(() => ClinicEntity, clinic => clinic.patients)
  @JoinTable()
  clinics: ClinicEntity[];

  @OneToMany(() => AnamnesisEntity, anamnesis => anamnesis.patient)
  anamneses: AnamnesisEntity[];

}