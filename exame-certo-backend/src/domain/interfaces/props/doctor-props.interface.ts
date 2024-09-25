import { BaseEntityProps } from './base-entity-props.interface';

export interface DoctorProps extends BaseEntityProps {
  registrationNumber: string;
  specialization: string;
}
