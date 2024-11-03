import { AppointmentStatus } from '../../enums/appointment-status.enum';
import { Patient } from '../../entities/patient.entity';
import { Doctor } from '../../entities/doctor.entity';
import { Attendant } from '../../entities/attendant.entity';

export interface SchedulingProps {
  date: Date;
  patient: Patient;
  doctor: Doctor;
  typeConsultation: string;
  AppointmentStatus: AppointmentStatus;
  consultationLocation: string;
  attendant?: Attendant;
  typeExam?: string;
}
