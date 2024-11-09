import { Exclude, Expose, Type } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { AddressDto } from '../../shared/dtos/address.dto';
import { ContactInfoDto } from '../../shared/dtos/contact-info.dto';
import { NursingLevel } from '../../../domain/enums/nursing-level.enum';

@Exclude()
export class RegisterNursingEventDto {
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
  public readonly nursingLevel: NursingLevel;

  @Type(() => AddressDto)
  @Expose()
  public readonly address: AddressDto;

  @Type(() => ContactInfoDto)
  @Expose()
  public readonly contactInfo: ContactInfoDto;

  @Expose()
  public readonly COREN?: string;

  @Expose()
  public readonly createdAt: Date;

  @Expose()
  public readonly updatedAt: Date;
}
