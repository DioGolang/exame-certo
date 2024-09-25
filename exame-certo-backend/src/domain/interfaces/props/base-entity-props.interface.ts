import { ContactInfo } from '../../value-objects/contact-info.vo';
import { Address } from '../../value-objects/address.vo';
import { Email } from '../../value-objects/email.vo';

export interface BaseEntityProps {
  name: string;
  email: Email;
  address: Address;
  contactInfo: ContactInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
