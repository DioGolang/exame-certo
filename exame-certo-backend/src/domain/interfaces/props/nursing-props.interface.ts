import { BaseEntityProps } from './base-entity-props.interface';
import { NursingLevel } from '../../enums/nursing-level.enum';

export interface NursingProps extends BaseEntityProps {
  nursingLevel: NursingLevel;
}
