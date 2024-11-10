import {
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { NursingLevel } from '../../../domain/enums/nursing-level.enum';

export class RegisterNursingDto {
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  public readonly name: string;

  public readonly email: string;

  @IsEnum(NursingLevel)
  public readonly nursingLevel: NursingLevel;

  @IsString()
  @IsOptional()
  public readonly COREN?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  public readonly address: AddressDto;

  @ValidateNested()
  @Type(() => ContactInfoDto)
  public readonly contactInfo: ContactInfoDto;
}
