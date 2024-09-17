import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Signature } from '../../../../domain/value-objects/signature.vo';
import { AdditionalInformation } from '../../../../domain/value-objects/additional-information.vo';
import { CID10 } from '../../../../domain/value-objects/cid.vo';
import { ExamEntity } from './exam.entity';
import { DoctorEntity } from './doctor.entity';

@Entity('reports')
export class ReportEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToMany(() => ExamEntity, (exam) => exam.reports)
  exams: ExamEntity[];

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.reports)
  doctor: DoctorEntity;

  @Column()
  date: Date;

  @Column()
  diagnosis: string;

  @Column('jsonb', { array: true })
  CID10: CID10[];

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
  restStartDate: Date;

  @Column()
  restDuration: Date;

  @Column()
  therapeuticConduct: string;

  @Column()
  clinicalEvolution: string;

  @Column()
  healthConsequences: string;

  @Column()
  consultationReason: string;

  @Column()
  illnessHistory: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
