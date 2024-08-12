import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "../../../domain/value-objects/contact-info.vo";
import { Address } from "../../../domain/value-objects/address.vo";
import { PatientEntity } from "./patient.entity";
import { DoctorEntity } from "./doctor.entity";
import { ExamEntity } from "./exam.entity";


@Entity('clinics')
export class ClinicEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenant_id: string;

  @Column()
  email:string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @Column('jsonb')
  address: Address;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @OneToMany(() => ExamEntity, exam => exam.clinic)
  exams: ExamEntity[]

  @ManyToMany(() => DoctorEntity, doctor => doctor.clinics)
  doctors: DoctorEntity[];

  @ManyToMany(() => PatientEntity, patient => patient.clinics)
  patients: PatientEntity[];

}