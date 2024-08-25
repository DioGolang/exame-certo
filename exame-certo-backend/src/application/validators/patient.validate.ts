import { IValidate } from "../../domain/interfaces/validate.interface";
import { Patient } from "../../domain/entites/patient.entity";
import { Sex } from "../../domain/enums/sex.enum";
import { MaritalStatus } from "../../domain/enums/marital-status.enum";

export class PatientValidate implements IValidate<Patient> {

  validate(patient: Patient): void{
    this.validateName(patient.name);
    this.validateLastName(patient.lastname);
    this.validateEmail(patient.email);
    this.validateDateOfBirth(patient.dateOfBirth)
    this.validateSex(patient.sex)
    this.validateMaritalStatus(patient.maritalStatus)
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("name is required");
    }
  }

  private validateLastName(lastName: string): void {
    if (!lastName || lastName.trim().length === 0) {
      throw new Error("name is required");
    }
  }

  private validateEmail(email: string): void {
    if (!email || email.trim().length === 0) {
      throw new Error("name is required");
    }
  }

  private validateDateOfBirth(dateOfBirth: Date): void {
    if (!dateOfBirth || dateOfBirth > new Date()) {
      throw new Error("name is required");
    }
  }

  private validateSex(sex: Sex): void {
    if (!sex || sex.trim().length === 0) {
      throw new Error("sex is required");
    }
  }

  private validateMaritalStatus(maritalStatus: MaritalStatus){
    if (!maritalStatus || maritalStatus.trim().length === 0) {
      throw new Error("Marital status is required");
    }

  }
  
}