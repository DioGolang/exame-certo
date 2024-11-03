import { TypeService } from '../../enums/type-service.enum';
import { ServiceStatus } from '../../enums/service-status.enum';
import { ManchesterProtocol } from '../../enums/manchester-protocol.enum';
import { Patient } from '../../entities/patient.entity';

export class ServiceProps {
  patient: Patient;
  typeService: TypeService;
  serviceStatus: ServiceStatus;
  priority?: ManchesterProtocol;
  servicePassword: string;
  arrivalTime: Date;
  isEmergency: boolean;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
