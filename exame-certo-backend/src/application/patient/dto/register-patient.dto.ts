import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { Sex } from '../../../domain/enums/sex.enum';
import { MaritalStatus } from '../../../domain/enums/marital-status.enum';
import { Type } from 'class-transformer';
import { DocumentationDto } from '../../shared/dtos/documentation.dto';
import { SocioEconomicInformationDto } from '../../shared/dtos/socio-economic-information.dto';
import { UniqueField } from '../../shared/validators/unique-field.decorator';

export class RegisterPatientDto {
  @IsString()
  public readonly name: string;

  @IsString()
  public readonly lastName: string;

  @UniqueField('fieldUniqueForPatient', 'uniqueEmail', {
    message: 'Email já cadastrado.',
  })
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @Type(() => Date)
  @IsDate()
  public readonly dateOfBirth: Date;

  @IsEnum(Sex)
  public readonly sex: Sex;

  @IsEnum(MaritalStatus)
  public readonly maritalStatus: MaritalStatus;

  @ValidateNested()
  @Type(() => DocumentationDto)
  public readonly documentation: DocumentationDto;

  @ValidateNested()
  @Type(() => SocioEconomicInformationDto)
  public readonly socioeconomicInformation: SocioEconomicInformationDto;

  @ValidateNested()
  @Type(() => AddressDto)
  public readonly address: AddressDto;

  @ValidateNested()
  @Type(() => ContactInfoDto)
  public readonly contactInfo: ContactInfoDto;

  @IsOptional()
  @IsString()
  public readonly healthInsurance?: string;
}
