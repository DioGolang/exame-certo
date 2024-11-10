import { Injectable } from '@nestjs/common';
import { BuilderFactory } from './builder.factory';
import { Attendant } from '../../entities/attendant.entity';
import { AttendantProps } from '../../interfaces/props/attendant-props.interface';
import { AttendantBuilder } from '../../builders/attendant.build';
import { Address } from '../../value-objects/address.vo';
import { ContactInfo } from '../../value-objects/contact-info.vo';
import { Email } from '../../value-objects/email.vo';

interface AttendantData {
  id: string;
  name: string;
  passwordHash: string;
  department: string;
  email: Email;
  address: Address;
  contactInfo: ContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AttendantFactory extends BuilderFactory<
  Attendant,
  AttendantProps,
  AttendantBuilder
> {
  createBuilder(): AttendantBuilder {
    return new AttendantBuilder();
  }
  configureBuilder(
    builder: AttendantBuilder,
    data: AttendantData,
  ): AttendantBuilder {
    return builder
      .withId(data.id)
      .withName(data.name)
      .withPasswordHash(data.passwordHash)
      .withDepartment(data.department)
      .withEmail(data.email.value)
      .withAddress(data.address)
      .withContactInfo(data.contactInfo)
      .withCreatedAt(data.createdAt)
      .withUpdatedAt(data.updatedAt);
  }
}
