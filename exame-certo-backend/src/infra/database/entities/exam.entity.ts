import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReferenceValues } from "../../../domain/value-objects/reference-values.vo";
import { ExamValues } from "../../../domain/value-objects/exam-values.vo";
import { TUSSCode } from "../../../domain/value-objects/tuss-code.vo";
import { CBHPMCode } from "../../../domain/value-objects/cbhpm-code.vo";
import { CIEFASCode } from "../../../domain/value-objects/ciefas-code.vo";
import { PatientEntity } from "./patient.entity";
import { ClinicEntity } from "./clinic.entity";
import { DoctorEntity } from "./doctor.entity";
import { ReportEntity } from "./report.entity";


@Entity('exams')
export class ExamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenant_id: string;

  @ManyToOne(() => PatientEntity, patient => patient.exams)
  patient: PatientEntity;

  @ManyToOne(() => ClinicEntity, clinic => clinic.exams)
  clinic: ClinicEntity;

  @ManyToOne(() => DoctorEntity, doctor => doctor.exams)
  doctor: DoctorEntity;

  @OneToMany(() => ReportEntity, report => report.exam)
  reports: ReportEntity[];

  @Column()
  date: Date;

  @Column()
  method: string;

  @Column('jsonb')
  examValues: ExamValues;

  @Column('jsonb')
  referenceValues: ReferenceValues;

  @Column("simple-array")
  images: string[];

  @Column('jsonb')
  tussCode: TUSSCode;

  @Column('jsonb')
  cbhpmCode: CBHPMCode;

  @Column('jsonb')
  ciefasCode: CIEFASCode;

  @Column()
  clinicalHistory: string;

  @Column()
  mainComplaint: string;

}