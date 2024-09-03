import { Clinic } from "../../entities/clinic.entity";
import { InvalidClinicException } from "../../exceptions/invalid-clinic.exception";


export class ClinicValidationService{
  validate(clinic: Clinic): void {
    this.validateName(clinic.name);
    this.validateEmail(clinic.email);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0){
      throw new InvalidClinicException("Name is required")
    }
  }

  private validateEmail(email: string): void {
    if (!email || email.trim().length === 0){
      throw new InvalidClinicException("Email is required")
    }
  }
}