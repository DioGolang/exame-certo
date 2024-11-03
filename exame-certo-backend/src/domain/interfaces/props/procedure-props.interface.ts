import { Service } from '../../entities/service.entity';
import { Doctor } from '../../entities/doctor.entity';
import { Nursing } from '../../entities/nursing.entity';
import { TypeProcedure } from '../../enums/type-procedure.interface';
import { ProcedureStatus } from '../../enums/procedure-status.enum';

export interface ProcedureProps {
  service: Service;
  doctor?: Doctor;
  nursing?: Nursing;
  description: string;
  typeProcedure: TypeProcedure;
  procedureStatus: ProcedureStatus;
  // start_date?: Date;
  // end_date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}