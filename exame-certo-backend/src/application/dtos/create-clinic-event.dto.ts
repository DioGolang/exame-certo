import { AddressDto } from './address.dto';
import { ContactInfoDto } from './contact-info.dto';

export class CreateClinicEventDto {
  public readonly id: string;
  public readonly password: string;
  public readonly name: string;
  public readonly email: string;
  public readonly address: AddressDto;
  public readonly contactInfo: ContactInfoDto;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
