import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { StatusTobeConsulted } from '../../../../domain/enums/status-tobe-consulted.enum';
import { DoctorEntity } from './doctor.entity';
import { ServiceEntity } from './service.entity';

@Entity()
export class ConsultationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  reason: string;

  @Column({ type: 'enum', enum: StatusTobeConsulted })
  statusTobeConsulted: StatusTobeConsulted;

  @OneToMany(() => DoctorEntity, (doctor) => doctor.consultations)
  doctor: DoctorEntity;

  @OneToMany(() => ServiceEntity, (service) => service.consultations)
  service: ServiceEntity;
}
