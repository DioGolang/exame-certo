import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";
import { Identification } from "../value-objects/identification.vo";
import { PersonalHistory } from "../value-objects/personal-history.vo";

export class Anamnesis {
  id: string;
  patient: Patient;
  doctor: Doctor;
  date: Date;
  identification: Identification;
  mainComplaint: string;
  historyOfPresentIllness: string;
  reviewOfSystems: string;
  pastMedicalHistory: string;
  familyHistory: string;
  socialHistory: string;
  personalHistory: PersonalHistory;
}