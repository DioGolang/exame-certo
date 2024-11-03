import { Doctor } from '../../entities/doctor.entity';
import { CID10 } from '../../value-objects/cid.vo';
import { AdditionalInformation } from '../../value-objects/additional-information.vo';
import { Signature } from '../../value-objects/signature.vo';
import { Consultation } from '../../entities/consultation.entity';

export class ReportProps {
  doctor: Doctor; // retirar o doctor porque a consulta já tem o médico
  consultation: Consultation;
  date: Date;
  diagnosis: string;
  CID10: CID10[];
  justification: string;
  conduct: string;
  hypothesis: string;
  additionalInformation: AdditionalInformation;
  signature: Signature;
  prognosis: string;
  restStartDate: Date;
  restDuration: Date;
  therapeuticConduct: string;
  clinicalEvolution: string;
  healthConsequences: string;
  consultationReason: string;
  illnessHistory: string;
  createdAt?: Date;
  updatedAt?: Date;
}
