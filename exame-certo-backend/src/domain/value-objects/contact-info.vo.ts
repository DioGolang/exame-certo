import { ContactInfoDto } from "../../application/dtos/contact-info.dto";

export class ContactInfo{
 public readonly phone: string;
 public readonly email: string;

  constructor(phone: string, email: string) {
    this.phone = phone;
    this.email = email;
  }

  static fromDto(contactInfo: ContactInfoDto): ContactInfo{
    return new ContactInfo(
      contactInfo.phone,
      contactInfo.email,
    )
  }

}
