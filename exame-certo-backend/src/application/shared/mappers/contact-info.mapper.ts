import { ContactInfo } from '../../../domain/value-objects/contact-info.vo';
import { ContactInfo as DocumentContactInfo } from '../../../infra/persistence/mongodb/schemas/contact-info.schema';
import { ContactInfoDto } from '../dtos/contact-info.dto';

export class ContactInfoMapper {
  static toDto(contactInfo: ContactInfo): ContactInfoDto {
    return {
      phone: contactInfo.phone,
      emergencyPhone: contactInfo.emergencyPhone,
      emergencyPhone2: contactInfo.emergencyPhone2,
      emergencyPhone3: contactInfo.emergencyPhone3,
      email: contactInfo.email,
      extension: contactInfo?.extension,
      extension2: contactInfo?.extension2,
      extension3: contactInfo?.extension3,
    };
  }
  static toDocument(contactInfo: ContactInfo): DocumentContactInfo {
    return {
      phone: contactInfo.phone,
      emergencyPhone: contactInfo.emergencyPhone,
      emergencyPhone2: contactInfo.emergencyPhone2,
      emergencyPhone3: contactInfo.emergencyPhone3,
      email: contactInfo.email,
      extension: contactInfo?.extension,
      extension2: contactInfo?.extension2,
      extension3: contactInfo?.extension3,
    };
  }
}
