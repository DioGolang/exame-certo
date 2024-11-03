import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TypeProcedure } from '../../../../domain/enums/type-procedure.interface';
import { ProcedureStatus } from '../../../../domain/enums/procedure-status.enum';
import { ServiceEntity } from './service.entity';

@Entity()
export class ProcedureEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TypeProcedure })
  typeProcedure: TypeProcedure;

  @Column({ type: 'enum', enum: ProcedureStatus })
  procedureStatus: ProcedureStatus;

  @ManyToOne(() => ServiceEntity, (service) => service.procedures)
  service: ServiceEntity;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
