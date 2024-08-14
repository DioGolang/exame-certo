import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { ClinicEntity } from './clinic.entity';

@Entity('doctor_clinics')
export class DoctorClinicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenant_id: string;

  @ManyToOne(() => DoctorEntity, doctor => doctor.clinics)
  doctor: DoctorEntity;

  @ManyToOne(() => ClinicEntity, clinic => clinic.doctors)
  clinic: ClinicEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  associatedAt: Date;
}
