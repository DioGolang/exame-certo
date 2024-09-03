import { ReportProps } from "../interfaces/props/report-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { Signature } from "../value-objects/signature.vo";
import { AdditionalInformation } from "../value-objects/additional-information.vo";
import { CID10 } from "../value-objects/cid.vo";
import { Doctor } from "../entities/doctor.entity";
import { Report } from "../entities/report.entity";

export class ReportBuild{
  private _id: string;
  private _props: Partial<ReportProps> = {};

  private constructor() { }

  public static create(): ReportBuild{
   const builder = new ReportBuild();
    builder._id = uuidv4();
    return builder;
  }


  public static rehydrate(id: string): ReportBuild{
    const builder = new ReportBuild();
    builder._id = id;
    return builder;
  }


  withDoctor(doctor: Doctor): ReportBuild{
    this._props.doctor = doctor;
    return this;
  }

  withDate(date: Date): ReportBuild{
    this._props.date = date;
    return this;
  }

  withDiagnosis(diagnosis: string): ReportBuild{
    this._props.diagnosis = diagnosis;
    return this;
  }

  withCID_10(CID_10: CID10[]): ReportBuild{
    this._props.CID_10 = CID_10;
    return this;
  }

  withJustification(justification: string): ReportBuild{
    this._props.justification = justification;
    return this;
  }

  withConduct(conduct: string): ReportBuild{
    this._props.conduct = conduct;
    return this;
  }

  withHypothesis(hypothesis: string): ReportBuild{
    this._props.hypothesis = hypothesis;
    return this;
  }

  withAdditionalInformation(additionalInformation: AdditionalInformation): ReportBuild{
    this._props.additionalInformation = additionalInformation;
    return this;
  }

  withSignature(signature: Signature): ReportBuild{
    this._props.signature = signature;
    return this;
  }

  withPrognosis(prognosis: string): ReportBuild{
    this._props.prognosis = prognosis;
    return this;
  }

  withRestStartDate(rest_start_date: Date): ReportBuild{
    this._props.rest_start_date = rest_start_date;
    return this;
  }

  withRestDuration(rest_duration: Date): ReportBuild{
    this._props.rest_duration = rest_duration;
    return this;
  }

  withTherapeuticConduct(therapeutic_conduct: string): ReportBuild{
    this._props.therapeutic_conduct = therapeutic_conduct;
    return this;
  }

  withClinicalEvolution(clinical_evolution: string): ReportBuild{
    this._props.clinical_evolution = clinical_evolution;
    return this;
  }

  withHealthConsequences(health_consequences: string): ReportBuild{
    this._props.health_consequences = health_consequences;
    return this;
  }

  withConsultationReason(consultation_reason: string): ReportBuild{
    this._props.consultation_reason = consultation_reason;
    return this;
  }

  withIllnessHistory(illness_history: string): ReportBuild{
    this._props.illness_history = illness_history;
    return this;
  }

  async build(): Promise<Report>{
    return new Report(this._id, this._props as ReportProps);
  }
}