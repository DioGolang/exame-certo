import { Doctor } from '../../entities/doctor.entity';
import { Patient } from '../../entities/patient.entity';

export class ConsultationProps {
  date: Date;
  doctor: Doctor;
  patient: Patient;
}
