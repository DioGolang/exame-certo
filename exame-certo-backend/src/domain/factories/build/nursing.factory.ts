import { Injectable } from '@nestjs/common';
import { BuilderFactory } from './builder.factory';
import { Nursing } from '../../entities/nursing.entity';
import { NursingProps } from '../../interfaces/props/nursing-props.interface';
import { NursingBuilder } from '../../builders/nursing.builder';
import { Address } from '../../value-objects/address.vo';
import { ContactInfo } from '../../value-objects/contact-info.vo';
import { NursingLevel } from '../../enums/nursing-level.enum';

interface NursingData {
  id: string;
  name: string;
  email: string;
  nursingLevel: NursingLevel;
  COREN?: string;
  passwordHash: string;
  address: Address;
  contactInfo: ContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class NursingFactory extends BuilderFactory<
  Nursing,
  NursingProps,
  NursingBuilder
> {
  createBuilder(): NursingBuilder {
    return new NursingBuilder();
  }
  configureBuilder(builder: NursingBuilder, data: NursingData): NursingBuilder {
    return builder
      .withId(data.id)
      .withName(data.name)
      .withEmail(data.email)
      .withPasswordHash(data.passwordHash)
      .withNursingLevel(data.nursingLevel)
      .withCOREN(data.COREN)
      .withAddress(data.address)
      .withContactInfo(data.contactInfo)
      .withCreatedAt(data.createdAt)
      .withUpdatedAt(data.updatedAt);
  }
}
