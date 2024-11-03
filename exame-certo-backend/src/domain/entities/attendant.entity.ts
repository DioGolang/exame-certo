import { AttendantProps } from '../interfaces/props/attendant-props.interface';
import { Scheduling } from './scheduling.entity';

export class Attendant {
  private readonly _id: string;
  private readonly _passwordHash: string;
  private readonly _props: Readonly<AttendantProps>;
  private readonly _scheduling: Scheduling[];
}
