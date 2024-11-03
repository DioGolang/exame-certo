import { Patient } from '../../entities/patient.entity';
import { Nursing } from '../../entities/nursing.entity';
import { Anamnesis } from '../../entities/anamnesis.entity';

export class ScreeningProps {
  patient: Patient;
  nursing: Nursing;
  anamnesis: Anamnesis;
  obs: string;
  data: Date;
}
