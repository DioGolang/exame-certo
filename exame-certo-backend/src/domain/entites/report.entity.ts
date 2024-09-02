import { Signature } from "../value-objects/signature.vo";
import { AdditionalInformation } from "../value-objects/additional-information.vo";
import { CID10 } from "../value-objects/cid.vo";
import { Exam } from "./exam.entity";
import { Doctor } from "./doctor.entity";
import { InvalidReportException } from "../exceptions/invalid-report.exception";
import { ReportProps } from "../interfaces/props/report-props.interface";

export class Report {

  private readonly _id: string;
  private readonly _props: Readonly<ReportProps>;
  private readonly _exams: Exam[];

  constructor(id: string, props: ReportProps) {
    this._id = id;
    this._props = {...props};
    this.validate();
  }

  //validate
  private checkField(field: string, errorMessage: string, errors: string[]): void {
    if (!field || field.trim() === '') {
      errors.push(errorMessage);
    }
  }

  private checkDateField(field: Date, errorMessage: string, errors: string[]): void {
    if (!field) {
      errors.push(errorMessage);
    }
  }

  private validate() {
    const errors: string[] = [];
    this.checkField(this._props.diagnosis, 'Diagnosis is required', errors);
    this.checkField(this._props.justification, 'Justification is required', errors);
    this.checkField(this._props.conduct, 'Conduct is required', errors);
    this.checkField(this._props.hypothesis, 'Hypothesis is required', errors);
    this.checkField(this._props.prognosis, 'Prognosis is required', errors);
    this.checkField(this._props.therapeutic_conduct, 'Therapeutic conduct is required', errors);
    this.checkField(this._props.clinical_evolution, 'Clinical evolution is required', errors);
    this.checkField(this._props.health_consequences, 'Health consequences is required', errors);
    this.checkField(this._props.consultation_reason, 'Consultation reason is required', errors);
    this.checkField(this._props.illness_history, 'Illness history is required', errors);
    this.checkDateField(this._props.rest_start_date, 'Rest start date is required', errors);
    this.checkDateField(this._props.rest_duration, 'Rest duration is required', errors);

    if (errors.length > 0 ){
      throw new InvalidReportException(errors.join("; "));
    }
  }

  get id(): string{
    return this._id;
  }


  get date(): Date{
    return this._props.date;
  }

  get diagnosis(): string{
    return this._props.diagnosis;
  }

  get cid_10(): CID10[]{
    return this._props.CID_10;
  }

  get justification(): string{
    return this._props.justification;
  }

  get conduct(): string{
    return this._props.conduct;
  }

  get hypothesis(): string{
    return this._props.hypothesis;
  }

  get additionalInformation(): AdditionalInformation{
    return this._props.additionalInformation;
  }

  get signature(): Signature{
    return this._props.signature;
  }

  get prognosis(): string{
    return this._props.prognosis;
  }

  get rest_start_date(): Date{
    return this._props.rest_start_date;
  }

  get rest_duration(): Date{
    return this._props.rest_duration;
  }

  get therapeutic_conduct(): string{
    return this._props.therapeutic_conduct;
  }

  get clinical_evolution(): string{
    return this._props.clinical_evolution;
  }

  get health_consequences(): string{
    return this._props.health_consequences;
  }

  get consultation_reason(): string{
    return this._props.consultation_reason;
  }

  get illness_history(): string{
    return this._props.illness_history;
  }

}
