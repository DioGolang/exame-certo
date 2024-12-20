import { BuilderFactory } from './builder.factory';
import { Injectable } from '@nestjs/common';
import { Doctor } from '../../entities/doctor.entity';
import { DoctorProps } from '../../interfaces/props/doctor-props.interface';
import { DoctorBuilder } from '../../builders/doctor.builder';
import { ContactInfoDto } from '../../../application/shared/dtos/contact-info.dto';
import { AddressDto } from '../../../application/shared/dtos/address.dto';

interface DoctorData {
  id: string;
  passwordHash: string;
  name: string;
  email: string;
  registrationNumber: string;
  specialization: string;
  address: AddressDto;
  contactInfo: ContactInfoDto;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class DoctorFactory extends BuilderFactory<
  Doctor,
  DoctorProps,
  DoctorBuilder
> {
  createBuilder(): DoctorBuilder {
    return new DoctorBuilder();
  }
  configureBuilder(
    builder: DoctorBuilder,
    doctorData: DoctorData,
  ): DoctorBuilder {
    return builder
      .withId(doctorData.id)
      .withPasswordHash(doctorData.passwordHash)
      .withName(doctorData.name)
      .withEmail(doctorData.email)
      .withRegistrationNumber(doctorData.registrationNumber)
      .withSpecialization(doctorData.specialization)
      .withAddress(doctorData.address)
      .withContactInfo(doctorData.contactInfo)
      .withCreatedAt(doctorData.createdAt)
      .withUpdatedAt(doctorData.updatedAt);
  }
}
