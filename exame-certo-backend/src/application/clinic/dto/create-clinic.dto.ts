import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';

export class CreateClinicDto {
  public readonly id?: string;
  public readonly password: string;
  public readonly name: string;
  public readonly email: string;
  public readonly address: AddressDto;
  public readonly contactInfo: ContactInfoDto;
}
