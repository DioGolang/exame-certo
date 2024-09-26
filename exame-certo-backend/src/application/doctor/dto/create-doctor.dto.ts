import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDoctorDto {
  @IsOptional()
  @IsUUID('4')
  public readonly id?: string;

  @IsString()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @ValidateNested()
  @Type(() => AddressDto)
  public readonly address: AddressDto;

  @ValidateNested()
  @Type(() => ContactInfoDto)
  public readonly contactInfo: ContactInfoDto;

  @IsString()
  public readonly registrationNumber: string;

  @IsString()
  public readonly specialization: string;
}
