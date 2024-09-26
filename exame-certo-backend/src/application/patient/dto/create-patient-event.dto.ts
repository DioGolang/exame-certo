import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Sex } from '../../../domain/enums/sex.enum';
import { MaritalStatus } from '../../../domain/enums/marital-status.enum';
import { Expose, Type } from 'class-transformer';
import { DocumentationDto } from '../../shared/dtos/documentation.dto';
import { SocioEconomicInformationDto } from '../../shared/dtos/socio-economic-information.dto';
import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';

export class CreatePatientEventDto {
  @IsUUID('4')
  public readonly id: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly lastName: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

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

  @Expose()
  public readonly createdAt: Date;

  @Expose()
  public readonly updatedAt: Date;
}
