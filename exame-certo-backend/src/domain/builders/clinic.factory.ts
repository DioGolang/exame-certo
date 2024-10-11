import { Injectable } from '@nestjs/common';
import { BuilderFactory } from './builder.factory';
import { Clinic } from '../entities/clinic.entity';
import { ClinicBuilder } from './clinic.builder';
import { ClinicProps } from '../interfaces/props/clinic-props.interface';
import { Address } from '../value-objects/address.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';

interface ClinicData {
  id: string;
  name: string;
  email: string;
  password: string;
  address: Address;
  contactInfo: ContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ClinicFactory extends BuilderFactory<
  Clinic,
  ClinicProps,
  ClinicBuilder
> {
  createBuilder(): ClinicBuilder {
    return new ClinicBuilder();
  }
  configureBuilder(builder: ClinicBuilder, data: ClinicData): ClinicBuilder {
    return builder
      .withId(data.id)
      .withName(data.name)
      .withEmail(data.email)
      .withPasswordHash(data.password)
      .withAddress(data.address)
      .withContactInfo(data.contactInfo)
      .withCreatedAt(data.createdAt)
      .withUpdatedAt(data.updatedAt);
  }
}
