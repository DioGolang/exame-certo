import { Doctor } from '../../entities/doctor.entity';
import { Service } from '../../entities/service.entity';
import { StatusTobeConsulted } from '../../enums/status-tobe-consulted.enum';

export class ConsultationProps {
  date: Date;
  doctor: Doctor;
  service: Service; // o agendamento deve ficar no atendimento
  reason: string;
  statusTobeConsulted: StatusTobeConsulted;
}
