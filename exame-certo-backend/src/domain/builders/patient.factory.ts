import { Injectable } from '@nestjs/common';
import { BuilderFactory } from './builder.factory';
import { Patient } from '../entities/patient.entity';
import { PatientProps } from '../interfaces/props/patient-props.interface';
import { PatientBuilder } from './patient.builder';

@Injectable()
export class PatientFactory extends BuilderFactory<
  Patient,
  PatientProps,
  PatientBuilder
> {
  createBuilder(): PatientBuilder {
    return new PatientBuilder();
  }
}
