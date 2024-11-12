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
import { Exclude, Expose, Type } from 'class-transformer';
import { DocumentationDto } from '../../shared/dtos/documentation.dto';
import { SocioEconomicInformationDto } from '../../shared/dtos/socio-economic-information.dto';
import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { EventDto } from '../../interfaces/event.dto.interface';

@Exclude()
export class RegisteredPatientEventDto implements EventDto {
  @Expose()
  @IsUUID('4')
  public readonly id: string;

  @Expose()
  @IsString()
  public readonly name: string;

  @Expose()
  @IsString()
  public readonly lastName: string;

  @Expose()
  @IsEmail()
  public readonly email: string;

  @Exclude()
  @IsString()
  public readonly passwordHash: string;

  @Expose()
  @IsDate()
  public readonly dateOfBirth: Date;

  @Expose()
  @IsEnum(Sex)
  public readonly sex: Sex;

  @Expose()
  @IsEnum(MaritalStatus)
  public readonly maritalStatus: MaritalStatus;

  @Expose()
  @ValidateNested()
  @Type(() => DocumentationDto)
  public readonly documentation: DocumentationDto;

  @Expose()
  @ValidateNested()
  @Type(() => SocioEconomicInformationDto)
  public readonly socioeconomicInformation: SocioEconomicInformationDto;

  @Expose()
  @ValidateNested()
  @Type(() => AddressDto)
  public readonly address: AddressDto;

  @Expose()
  @ValidateNested()
  @Type(() => ContactInfoDto)
  public readonly contactInfo: ContactInfoDto;

  @Expose()
  @IsOptional()
  @IsString()
  public readonly healthInsurance?: string;

  @Expose()
  @IsDate()
  public readonly createdAt: Date;

  @Expose()
  @IsDate()
  public readonly updatedAt: Date;
}
