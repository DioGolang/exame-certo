import { Patient } from '../../entities/patient.entity';
import { Nursing } from '../../entities/nursing.entity';

export class ScreeningProps {
  patient: Patient;
  nursing: Nursing;
  obs: string;
  data: Date;
}
