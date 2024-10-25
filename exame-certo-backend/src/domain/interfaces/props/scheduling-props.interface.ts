import { AppointmentStatus } from '../../enums/appointment-status.enum';
import { Patient } from '../../entities/patient.entity';
import { Doctor } from '../../entities/doctor.entity';

export interface SchedulingProps {
  date: Date;
  patient: Patient;
  doctor: Doctor;
  typeConsultation: string;
  TypeExam: string;
  AppointmentStatus: AppointmentStatus;
  consultationLocation: string;
}
