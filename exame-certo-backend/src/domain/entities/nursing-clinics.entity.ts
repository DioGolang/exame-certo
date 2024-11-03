import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { NursingEntity } from '../../infra/persistence/postgres/entities/nursing.entity';
import { ClinicEntity } from '../../infra/persistence/postgres/entities/clinic.entity';

@Entity()
export class NursingClinicsEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => NursingEntity, (nursing) => nursing.clinics, { lazy: true })
  nursing: NursingEntity;

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.nursing, { lazy: true })
  clinic: ClinicEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  associatedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt?: Date;
}
