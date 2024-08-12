import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";
import { Identification } from "../value-objects/identification.vo";
import { PersonalHistory } from "../value-objects/personal-history.vo";

//QUEIXA PRINCIPAL E DURAÇÃO (Q.D.)
//HISTÓRIA DA MOLÉSTIA ATUAL (H.M.A.)
//HISTÓRIA MÉDICA PREGRESSA (ANTECEDENTES PESSOAIS)
//HISTÓRIA FAMILIAR (ANTECEDENTES FAMILIARES)
//INTERROGATÓRIO SOBRE OS DIVERSOS APARELHOS ( I.D.A.):
//AP: Antecedentes fisiológicos

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