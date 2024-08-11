import { Address } from "../value-objects/address.vo";
import { Clinic } from "./clinic.entity";
import { Patient } from "./patient.entity";
import { Exam } from "./exam.entity";
import { Anamnesis } from "./anamnesis.entity";
import { ContactInfo } from "../value-objects/contact-info.vo";


export class Doctor {
  id: string; // UUID
  name: string;
  contactInfo: ContactInfo;
  professionalAddress: Address;
  registrationNumber: string;
  specialization: string;
  clinic: Clinic;
  patients: Patient[];
  exams: Exam[];
  anamnese: Anamnesis[];
  reports: Report[];
}
