import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { ReferenceValues } from '../../../../domain/value-objects/reference-values.vo';
import { ExamValues } from '../../../../domain/value-objects/exam-values.vo';
import { TUSSCode } from '../../../../domain/value-objects/tuss-code.vo';
import { CBHPMCode } from '../../../../domain/value-objects/cbhpm-code.vo';
import { CIEFASCode } from '../../../../domain/value-objects/ciefas-code.vo';
import { PatientEntity } from './patient.entity';
import { ClinicEntity } from './clinic.entity';
import { DoctorEntity } from './doctor.entity';
import { ReportEntity } from './report.entity';

@Entity('exams')
export class ExamEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.exams)
  patient: PatientEntity;

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.exams)
  clinic: ClinicEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.exams)
  doctor: DoctorEntity;

  @ManyToMany(() => ReportEntity, (report) => report.exams)
  reports: ReportEntity[];

  @Column()
  date: Date;

  @Column()
  type: string;

  @Column()
  method: string;

  @Column('jsonb')
  valuesObtained: ExamValues;

  @Column('jsonb')
  referenceValues: ReferenceValues;

  @Column('simple-array')
  images: string[];

  @Column('jsonb')
  TUSSCode: TUSSCode;

  @Column('jsonb')
  CBHPMCode: CBHPMCode;

  @Column('jsonb')
  CIEFASCode: CIEFASCode;

  @Column()
  clinicalHistory: string;

  @Column()
  mainComplaint: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
