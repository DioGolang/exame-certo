import { Patient } from "../../entites/patient.entity";
import { Doctor } from "../../entites/doctor.entity";
import { Identification } from "../../value-objects/identification.vo";
import { PersonalHistory } from "../../value-objects/personal-history.vo";


export interface AnamnesisProps{
  date: Date;
  patient: Patient;
  doctor: Doctor;
  identification: Identification;
  mainComplaint: string;
  historyOfPresentIllness: string;
  reviewOfSystems: string;
  pastMedicalHistory: string;
  familyHistory: string;
  socialHistory: string;
  personalHistory: PersonalHistory;
}