
import { Sex } from "../../enums/sex.enum";
import { MaritalStatus } from "../../enums/marital-status.enum";
import { Patient } from "../../entities/patient.entity";
import { InvalidPatientException } from "../../exceptions/invalid-patient.exception";


export class PatientValidationService {
  validate(patient: Patient): void {
    this.validateName(patient.name);
    this.validateLastName(patient.lastName);
    this.validateEmail(patient.email);
    this.validateDateOfBirth(patient.dateOfBirth);
    this.validateSex(patient.sex);
    this.validateMaritalStatus(patient.maritalStatus);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new InvalidPatientException("Name is required");
    }
  }

  private validateLastName(lastName: string): void {
    if (!lastName || lastName.trim().length === 0) {
      throw new InvalidPatientException("Last name is required");
    }
  }

  private validateEmail(email: string): void {
    if (!email || email.trim().length === 0) {
      throw new InvalidPatientException("Email is required");
    }
  }

  private validateDateOfBirth(dateOfBirth: Date): void {
    if (!dateOfBirth || dateOfBirth > new Date()) {
      throw new InvalidPatientException("Date of birth is required");
    }
  }

  private validateSex(sex: Sex): void {
    if (!sex) {
      throw new InvalidPatientException("Sex is required");
    }
  }

  private validateMaritalStatus(maritalStatus: MaritalStatus): void {
    if (!maritalStatus) {
      throw new InvalidPatientException("Marital status is required");
    }
  }
}