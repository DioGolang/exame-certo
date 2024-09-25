import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateClinicDto {
  @IsOptional()
  @IsUUID('4')
  public readonly id?: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  public readonly address: AddressDto;
  public readonly contactInfo: ContactInfoDto;
}
