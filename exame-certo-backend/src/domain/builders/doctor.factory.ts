import { BuilderFactory } from './builder.factory';
import { Injectable } from '@nestjs/common';
import { Doctor } from '../entities/doctor.entity';
import { DoctorProps } from '../interfaces/props/doctor-props.interface';
import { DoctorBuilder } from './doctor.builder';
import { Address } from '../value-objects/address.vo';
import { ContactInfoDto } from '../../application/shared/dtos/contact-info.dto';

interface DoctorData {
  id: string;
  password: string;
  name: string;
  email: string;
  registrationNumber: string;
  specialization: string;
  address: Address;
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
  configureDoctorBuilder(
    builder: DoctorBuilder,
    doctorData: DoctorData,
  ): DoctorBuilder {
    return builder
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
