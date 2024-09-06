import { Email } from "../../value-objects/email.vo";
import { Address } from "../../value-objects/address.vo";
import { ContactInfo } from "../../value-objects/contact-info.vo";


export interface ClinicProps{
  name: string;
  email: Email;
  address: Address;
  contactInfo: ContactInfo;
}