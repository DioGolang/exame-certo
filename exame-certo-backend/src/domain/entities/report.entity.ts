import { Signature } from '../value-objects/signature.vo';
import { AdditionalInformation } from '../value-objects/additional-information.vo';
import { CID10 } from '../value-objects/cid.vo';
import { Exam } from './exam.entity';
import { InvalidReportException } from '../exceptions/invalid-report.exception';
import { ReportProps } from '../interfaces/props/report-props.interface';
import { ValidationUtils } from '../../shared/utils/validation.utils';
import { EntityUtils } from '../../shared/utils/entity.utils';

export class Report {
  private readonly _id: string;
  private readonly _props: Readonly<ReportProps>;
  private readonly _exams: Exam[];

  constructor(id: string, props: ReportProps) {
    this._id = id;
    this._props = { ...props };
    this.validate();
  }

  //validate

  private validate() {
    const errors: string[] = [];
    ValidationUtils.checkField(
      this._props.diagnosis,
      'Diagnosis is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.justification,
      'Justification is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.conduct,
      'Conduct is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.hypothesis,
      'Hypothesis is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.prognosis,
      'Prognosis is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.therapeuticConduct,
      'Therapeutic conduct is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.clinicalEvolution,
      'Clinical evolution is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.healthConsequences,
      'Health consequences is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.consultationReason,
      'Consultation reason is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.illnessHistory,
      'Illness history is required',
      errors,
    );
    ValidationUtils.checkDateField(
      this._props.restStartDate,
      'Rest start date is required',
      errors,
    );
    ValidationUtils.checkDateField(
      this._props.restDuration,
      'Rest duration is required',
      errors,
    );

    if (errors.length > 0) {
      throw new InvalidReportException(errors.join('; '));
    }
  }

  // Add methods for specific collections
  public addExam(exam: Exam): void {
    EntityUtils.addToCollection(this._exams, exam, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._exams,
        'Exam',
        InvalidReportException,
      ),
    );
  }

  public addCID10(cid: CID10): void {
    EntityUtils.addToCollectionCID10(this._props.CID10, cid, (item) =>
      EntityUtils.checkDuplicateCID10(
        item,
        this._props.CID10,
        'CID',
        InvalidReportException,
      ),
    );
  }

  public removeExam(exam: Exam): void {
    EntityUtils.removeFromCollection(
      this._exams,
      exam,
      InvalidReportException,
      'Exam not found',
    );
  }

  get id(): string {
    return this._id;
  }

  get date(): Date {
    return this._props.date;
  }

  get diagnosis(): string {
    return this._props.diagnosis;
  }

  get cid10(): CID10[] {
    return this._props.CID10;
  }

  get justification(): string {
    return this._props.justification;
  }

  get conduct(): string {
    return this._props.conduct;
  }

  get hypothesis(): string {
    return this._props.hypothesis;
  }

  get additionalInformation(): AdditionalInformation {
    return this._props.additionalInformation;
  }

  get signature(): Signature {
    return this._props.signature;
  }

  get prognosis(): string {
    return this._props.prognosis;
  }

  get rest_start_date(): Date {
    return this._props.restStartDate;
  }

  get rest_duration(): Date {
    return this._props.restDuration;
  }

  get therapeutic_conduct(): string {
    return this._props.therapeuticConduct;
  }

  get clinical_evolution(): string {
    return this._props.clinicalEvolution;
  }

  get health_consequences(): string {
    return this._props.healthConsequences;
  }

  get consultation_reason(): string {
    return this._props.consultationReason;
  }

  get illness_history(): string {
    return this._props.illnessHistory;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }
}
