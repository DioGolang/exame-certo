import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';
import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';

@Exclude()
export class RegisterAttendantEventDto {
  @Expose()
  @IsUUID('4')
  public readonly id: string;

  @Exclude()
  public readonly passwordHash: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly department: string;

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
