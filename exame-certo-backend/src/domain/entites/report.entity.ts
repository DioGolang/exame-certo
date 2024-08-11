import { Exam } from "./exam.entity";
import { Doctor } from "./doctor.entity";
import { Signature } from "../value-objects/signature.vo";
import { AdditionalInformation } from "../value-objects/additional-information.vo";
import { CID10 } from "../value-objects/cid.vo";


export class Report {
  id: string;
  exam: Exam;
  doctor: Doctor;
  date: Date;
  diagnosis: string;
  cid_10: CID10;
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
