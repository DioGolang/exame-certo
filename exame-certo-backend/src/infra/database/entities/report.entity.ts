import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Signature } from "../../../domain/value-objects/signature.vo";
import { AdditionalInformation } from "../../../domain/value-objects/additional-information.vo";
import { CID10 } from "../../../domain/value-objects/cid.vo";
import { ExamEntity } from "./exam.entity";
import { DoctorEntity } from "./doctor.entity";


@Entity('reports')
export class ReportEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenant_id: string;

  @ManyToMany(() => ExamEntity, exam => exam.reports)
  exams: ExamEntity[];

  @ManyToOne(() => DoctorEntity, doctor => doctor.reports)
  doctor: DoctorEntity;

  @Column()
  date: Date;

  @Column()
  diagnosis: string;

  @Column('jsonb')
  cid_10: CID10;

  @Column()
  justification: string;

  @Column()
  conduct: string;

  @Column()
  hypothesis: string;

  @Column('jsonb')
  additionalInformation: AdditionalInformation;

  @Column('jsonb')
  signature: Signature;

  @Column()
  prognosis: string;

  @Column()
  rest_start_date: Date;

  @Column()
  rest_duration: Date;

  @Column()
  therapeutic_conduct: string;

  @Column()
  clinical_evolution: string;

  @Column()
  health_consequences: string;

  @Column()
  consultation_reason: string;

  @Column()
  illness_history: string;

}
