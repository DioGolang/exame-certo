import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { ClinicEntity } from './clinic.entity';

@Entity('doctor_clinics')
export class DoctorClinicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.clinics)
  doctor: DoctorEntity;

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.doctors)
  clinic: ClinicEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  associatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;
}
