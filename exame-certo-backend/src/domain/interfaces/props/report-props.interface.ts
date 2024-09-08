import { Doctor } from '../../entities/doctor.entity';
import { CID10 } from '../../value-objects/cid.vo';
import { AdditionalInformation } from '../../value-objects/additional-information.vo';
import { Signature } from '../../value-objects/signature.vo';

export class ReportProps {
  doctor: Doctor;
  date: Date;
  diagnosis: string;
  CID_10: CID10[];
  justification: string;
  conduct: string;
  hypothesis: string;
  additionalInformation: AdditionalInformation;
  signature: Signature;
  prognosis: string;
  rest_start_date: Date;
  rest_duration: Date;
  therapeutic_conduct: string;
  clinical_evolution: string;
  health_consequences: string;
  consultation_reason: string;
  illness_history: string;
}
