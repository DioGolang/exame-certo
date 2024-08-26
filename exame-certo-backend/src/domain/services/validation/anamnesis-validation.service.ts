import { InvalidAnamnesisException } from "../../exceptions/invalid-anamnesis.exception";
import { Anamnesis } from "../../entites/anamnesis.entity";


export class AnamnesisValidationService{
  validate(anamnesis: Anamnesis): void {
    this.validatePatientId(anamnesis.patient.id);
    this.validateDoctorId(anamnesis.doctor.id);
    this.validateDate(anamnesis.date);
  }

  private validatePatientId(patientId: string): void {
    if (!patientId || patientId.trim().length === 0) {
      throw new InvalidAnamnesisException("Patient ID is required");
    }
  }

  private validateDoctorId(doctorId: string): void {
    if (!doctorId || doctorId.trim().length === 0) {
      throw new InvalidAnamnesisException("Patient ID is required");
    }
  }

  private validateDate(date: Date): void {
    if (!date || date > new Date()) {
      throw new InvalidAnamnesisException("Date is required");
    }
  }

}