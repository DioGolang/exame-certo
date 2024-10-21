import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UniqueField } from '../../shared/validators/unique-field.decorator';

export class CreateDoctorDto {
  @IsString()
  public readonly name: string;

  @UniqueField('fieldUniqueForDoctor', 'uniqueEmail', {
    message: 'Email já cadastrado.',
  })
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

  @UniqueField('fieldUniqueForDoctor', 'uniqueRegistrationNumber', {
    message: 'CRM já cadastrado.',
  })
  @IsString()
  public readonly registrationNumber: string;

  @IsString()
  public readonly specialization: string;
}
