import { Address } from "../value-objects/address.vo";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Exam } from "./exam.entity";
import { ContactInfo } from "../value-objects/contact-info.vo";


export class Clinic {
  id: string; // UUID
  name: string;
  address: Address;
  contactInfo: ContactInfo;
  doctors: Doctor[];
  patients: Patient[];
  exams: Exam[];
}
