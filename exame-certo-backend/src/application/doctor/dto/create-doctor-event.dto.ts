import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';

@Exclude()
export class CreateDoctorEventDto {
  @Expose()
  @IsUUID('4')
  public readonly id: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly email: string;

  @Exclude()
  public readonly passwordHash: string;

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
  @IsDate()
  public readonly createdAt: Date;

  @Expose()
  @IsDate()
  public readonly updatedAt: Date;
}
