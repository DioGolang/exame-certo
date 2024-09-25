import { Sex } from '../../enums/sex.enum';
import { MaritalStatus } from '../../enums/marital-status.enum';
import { Documentation } from '../../value-objects/documentation.vo';
import { SocioEconomicInformation } from '../../value-objects/socio-economic-information.vo';
import { BaseEntityProps } from './base-entity-props.interface';

export interface PatientProps extends BaseEntityProps {
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
  maritalStatus: MaritalStatus;
  documentation: Documentation;
  socioeconomicInformation: SocioEconomicInformation;
  healthInsurance?: string;
}
