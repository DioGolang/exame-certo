import { Patient } from '../../domain/entities/patient.entity';
import { Clinic } from '../../domain/entities/clinic.entity';
import { PatientEntity } from '../persistence/postgres/entities/patient.entity';
import { ClinicEntity } from '../persistence/postgres/entities/clinic.entity';
import { DoctorEntity } from '../persistence/postgres/entities/doctor.entity';
import { Doctor } from '../../domain/entities/doctor.entity';

export interface Mapping {
  mapPatientToDomain(patientEntity: PatientEntity): Patient;
  mapClinicToDomain(clinicEntity: ClinicEntity): Clinic;
  mapDoctorToDomain(doctorEntity: DoctorEntity): Doctor;
  mapPatientToPersistence(patient: Patient): PatientEntity;
  mapClinicToPersistence(clinic: Clinic): ClinicEntity;
  mapDoctorToPersistence(doctor: Doctor): DoctorEntity;
}
