import { Doctor } from "../../entities/doctor.entity";
import { InvalidDoctorException } from "../../exceptions/invalid-doctor.exception";

export class DoctorValidationService{
  validate(doctor: Doctor): void {
    this.validateId(doctor.id);
    this.validateName(doctor.name);
    this.validateEmail(doctor.email);
    this.validateRegistrationNumber(doctor.registrationNumber);
    this.validateSpecialization(doctor.specialization);
  }

  private validateId(id: string): void {
    if (!id || id.trim().length === 0) {
      throw new InvalidDoctorException("Id is required");
    }
  }

  private validateName(name: string): void{
    if (!name || name.trim().length === 0){
      throw new InvalidDoctorException("Name is required");
    }
  }

  private validateEmail(email: string): void{
    if (!email || email.trim().length === 0){
      throw new InvalidDoctorException("email is required")
    }
  }

  private validateRegistrationNumber(registrationNumber: string): void{
    if (!registrationNumber ||registrationNumber.trim().length === 0){
      throw new InvalidDoctorException("registration Number is required")
    }
  }

  private validateSpecialization(specialization: string): void {
    if (!specialization || specialization.trim().length === 0){
      throw new InvalidDoctorException("specialization is required")
    }
  }

}