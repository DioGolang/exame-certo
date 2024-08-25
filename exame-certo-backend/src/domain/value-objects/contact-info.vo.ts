import { ContactInfoDto } from "../../application/dtos/contact-info.dto";

export class ContactInfo{
 public readonly phone: string;
 public readonly emergencyPhone: string;
 public readonly emergencyPhone2: string;
 public readonly emergencyPhone3: string;
 public readonly email: string;
 public readonly extension?: string;
 public readonly extension2?: string;
 public readonly extension3?: string;

  constructor(phone: string, emergencyPhone:string, emergencyPhone2: string, emergencyPhone3 :string, email: string, extension: string, extension2: string, extension3: string) {
    this.phone = phone;
    this.emergencyPhone = emergencyPhone;
    this.emergencyPhone2 = emergencyPhone2;
    this.emergencyPhone3 = emergencyPhone3;
    this.email = email;
    this.extension = extension;
    this.extension2 = extension2;
    this.extension3 = extension3;
  }

  static fromDto(contactInfo: ContactInfoDto): ContactInfo{
    return new ContactInfo(
      contactInfo.phone,
      contactInfo.emergencyPhone,
      contactInfo.emergencyPhone2,
      contactInfo.emergencyPhone3,
      contactInfo.email,
      contactInfo.extension,
      contactInfo.extension2,
      contactInfo.extension3
    )
  }

}
