import { ContactInfoDto } from "../../../../application/dtos/contact-info.dto";
import { ContactInfo } from "../../../../domain/value-objects/contact-info.vo";

export class ContactInfoMapper {
  static toDto(contactInfo: ContactInfo): ContactInfoDto {
    return {
      phone: contactInfo.phone,
      emergencyPhone: contactInfo.emergencyPhone,
      emergencyPhone2: contactInfo.emergencyPhone2,
      emergencyPhone3: contactInfo.emergencyPhone3,
      email: contactInfo.email,
      extension: contactInfo.extension,
      extension2: contactInfo.extension2,
      extension3: contactInfo.extension3,
    };
  }

}
