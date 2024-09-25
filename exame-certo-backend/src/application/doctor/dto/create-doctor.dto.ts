import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateDoctorDto {
  @IsUUID('4')
  public readonly id?: string;

  @IsString()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  public readonly contactInfo: ContactInfoDto;
  public readonly address: AddressDto;

  @IsString()
  public readonly registrationNumber: string;

  @IsString()
  public readonly specialization: string;
}
