import { Email } from "../../value-objects/email.vo";
import { ContactInfo } from "../../value-objects/contact-info.vo";
import { Address } from "../../value-objects/address.vo";


export interface DoctorProps{
  name: string;
  email: Email;
  contactInfo: ContactInfo;
  professionalAddress: Address;
  registrationNumber: string;
  specialization: string;
}