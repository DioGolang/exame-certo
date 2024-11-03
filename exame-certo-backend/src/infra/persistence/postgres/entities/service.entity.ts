import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { TypeService } from '../../../../domain/enums/type-service.enum';
import { ServiceStatus } from '../../../../domain/enums/service-status.enum';
import { ManchesterProtocol } from '../../../../domain/enums/manchester-protocol.enum';
import { PatientEntity } from './patient.entity';
import { ProcedureEntity } from './procedure.entity';
import { ConsultationEntity } from './consultation.entity';
import { ClinicEntity } from './clinic.entity';

@Entity()
export class ServiceEntity {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => PatientEntity, (patient) => patient.service)
  patient: PatientEntity;

  @OneToMany(() => ConsultationEntity, (consultation) => consultation.service)
  consultations: ConsultationEntity[];

  @Column({ type: 'enum', enum: TypeService })
  typeService: TypeService;

  @Column({ type: 'enum', enum: ServiceStatus })
  serviceStatus: ServiceStatus;

  @Column({ type: 'enum', enum: ManchesterProtocol })
  priority: ManchesterProtocol;

  @Column()
  servicePassword: string;

  @Column()
  arrivalTime: Date;

  @Column()
  isEmergency: boolean;

  @Column()
  description: string;

  @OneToMany(() => ProcedureEntity, (procedure) => procedure.service)
  procedures: ProcedureEntity[];

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.services)
  clinic: ClinicEntity;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
