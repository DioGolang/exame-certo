import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { AppointmentStatus } from '../../../../domain/enums/appointment-status.enum';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';
import { AttendantEntity } from './attendant.entity';

@Entity()
export class SchedulingEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  typeConsultation: string;

  @Column()
  consultationLocation: string;

  @Column({ type: 'enum', enum: AppointmentStatus })
  appointmentStatus: AppointmentStatus;

  @ManyToOne(() => PatientEntity, (patient) => patient.scheduling)
  patient: PatientEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.scheduling)
  doctor: DoctorEntity;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt?: Date;

  @Column()
  typeExam?: string;

  @ManyToOne(() => AttendantEntity, (attendant) => attendant.scheduling)
  attendant: AttendantEntity;
}
