import { ReportProps } from '../interfaces/props/report-props.interface';
import { v4 as uuidv4 } from 'uuid';
import { Signature } from '../value-objects/signature.vo';
import { AdditionalInformation } from '../value-objects/additional-information.vo';
import { CID10 } from '../value-objects/cid.vo';
import { Doctor } from '../entities/doctor.entity';
import { Report } from '../entities/report.entity';
import { Exam } from '../entities/exam.entity';

export class ReportBuilder {
  private readonly _id: string;
  private _props: Partial<ReportProps> = {};
  private _exams: Exam[] = [];

  private constructor(id?: string) {
    this._id = id || uuidv4();
  }

  public static create(): ReportBuilder {
    return new ReportBuilder();
  }

  public static rehydrate(id: string): ReportBuilder {
    return new ReportBuilder(id);
  }

  withDoctor(doctor: Doctor): ReportBuilder {
    this._props.doctor = doctor;
    return this;
  }

  withDate(date: Date): ReportBuilder {
    this._props.date = date;
    return this;
  }

  withDiagnosis(diagnosis: string): ReportBuilder {
    this._props.diagnosis = diagnosis;
    return this;
  }

  withCID10(CID_10: CID10[]): ReportBuilder {
    this._props.CID10 = CID_10;
    return this;
  }

  withJustification(justification: string): ReportBuilder {
    this._props.justification = justification;
    return this;
  }

  withConduct(conduct: string): ReportBuilder {
    this._props.conduct = conduct;
    return this;
  }

  withHypothesis(hypothesis: string): ReportBuilder {
    this._props.hypothesis = hypothesis;
    return this;
  }

  withAdditionalInformation(
    additionalInformation: AdditionalInformation,
  ): ReportBuilder {
    this._props.additionalInformation = additionalInformation;
    return this;
  }

  withSignature(signature: Signature): ReportBuilder {
    this._props.signature = signature;
    return this;
  }

  withPrognosis(prognosis: string): ReportBuilder {
    this._props.prognosis = prognosis;
    return this;
  }

  withRestStartDate(rest_start_date: Date): ReportBuilder {
    this._props.restStartDate = rest_start_date;
    return this;
  }

  withRestDuration(rest_duration: Date): ReportBuilder {
    this._props.restDuration = rest_duration;
    return this;
  }

  withTherapeuticConduct(therapeutic_conduct: string): ReportBuilder {
    this._props.therapeuticConduct = therapeutic_conduct;
    return this;
  }

  withClinicalEvolution(clinical_evolution: string): ReportBuilder {
    this._props.clinicalEvolution = clinical_evolution;
    return this;
  }

  withHealthConsequences(health_consequences: string): ReportBuilder {
    this._props.healthConsequences = health_consequences;
    return this;
  }

  withConsultationReason(consultation_reason: string): ReportBuilder {
    this._props.consultationReason = consultation_reason;
    return this;
  }

  withIllnessHistory(illness_history: string): ReportBuilder {
    this._props.illnessHistory = illness_history;
    return this;
  }

  withExam(exam: Exam[]): ReportBuilder {
    this._exams = exam;
    return this;
  }

  public withCreatedAt(createdAt: Date): ReportBuilder {
    this._props.createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date): ReportBuilder {
    this._props.updatedAt = updatedAt;
    return this;
  }

  async build(): Promise<Report> {
    const report = new Report(this._id, this._props as ReportProps);
    this._props.CID10.forEach((c) => report.addCID10(c));
    // this._exams.forEach((e) => report.addExam(e));
    return report;
  }
}
