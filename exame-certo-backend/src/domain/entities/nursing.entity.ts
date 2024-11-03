import { NursingProps } from '../interfaces/props/nursing-props.interface';
import { Clinic } from './clinic.entity';
import { Anamnesis } from './anamnesis.entity';
import { Screening } from './screening.entity';

export class Nursing {
  private readonly _id: string;
  private readonly _passwordHash: string;
  private _props: Readonly<NursingProps>;
  private _clinics: Clinic[] = [];
  private _anamnesis: Anamnesis[] = [];
  private _screening: Screening[] = [];
}
