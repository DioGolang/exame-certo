import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { AnamnesisEntity } from './anamnesis.entity';
import { NursingEntity } from './nursing.entity';

@Entity()
export class ScreeningEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.screening)
  patient: PatientEntity;

  @ManyToOne(() => NursingEntity, (nursing) => nursing.id, { lazy: true })
  nursing: NursingEntity;

  @OneToOne(() => AnamnesisEntity, (anamnesis) => anamnesis.screening)
  anamnesis: AnamnesisEntity;

  @Column()
  obs: string;

  @Column('timestamp')
  data: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt?: Date;
}
