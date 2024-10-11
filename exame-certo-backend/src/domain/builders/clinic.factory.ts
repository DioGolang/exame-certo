import { Injectable } from '@nestjs/common';
import { BuilderFactory } from './builder.factory';
import { Clinic } from '../entities/clinic.entity';
import { ClinicBuilder } from './clinic.builder';
import { ClinicProps } from '../interfaces/props/clinic-props.interface';

@Injectable()
export class ClinicFactory extends BuilderFactory<
  Clinic,
  ClinicProps,
  ClinicBuilder
> {
  createBuilder(): ClinicBuilder {
    return new ClinicBuilder();
  }
}
