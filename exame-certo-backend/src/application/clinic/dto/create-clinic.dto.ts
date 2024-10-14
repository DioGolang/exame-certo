import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { IsEmail, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UniqueField } from '../../shared/validators/unique-field.decorator';

export class CreateClinicDto {
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  public readonly name: string;

  @UniqueField('emailUniqueForClinic', { message: 'Email já cadastrado.' })
  @IsEmail()
  public readonly email: string;

  @ValidateNested()
  @Type(() => AddressDto)
  public readonly address: AddressDto;

  @ValidateNested()
  @Type(() => ContactInfoDto)
  public readonly contactInfo: ContactInfoDto;
}
