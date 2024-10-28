import { BaseEntityProps } from './base-entity-props.interface';

export interface AttendantProps extends BaseEntityProps {
  readonly id: string;
  readonly role: string;
}
