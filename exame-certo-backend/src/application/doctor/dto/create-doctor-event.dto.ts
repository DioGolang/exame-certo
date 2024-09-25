import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class CreateDoctorEventDto {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly email: string;

  @Exclude()
  public readonly password: string;

  @Expose()
  public readonly registrationNumber: string;

  @Expose()
  public readonly specialization: string;

  @Type(() => AddressDto)
  @Expose()
  public readonly address: AddressDto;

  @Type(() => ContactInfoDto)
  @Expose()
  public readonly contactInfo: ContactInfoDto;

  @Expose()
  public readonly createdAt: Date;

  @Expose()
  public readonly updatedAt: Date;
}
