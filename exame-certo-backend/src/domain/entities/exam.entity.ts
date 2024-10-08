import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { ExamValues } from '../value-objects/exam-values.vo';
import { ReferenceValues } from '../value-objects/reference-values.vo';
import { TUSSCode } from '../value-objects/tuss-code.vo';
import { CBHPMCode } from '../value-objects/cbhpm-code.vo';
import { CIEFASCode } from '../value-objects/ciefas-code.vo';
import { Report } from './report.entity';
import { Clinic } from './clinic.entity';
import { InvalidExamException } from '../exceptions/invalid-exam.exception';
import { ExamProps } from '../interfaces/props/exam-props.interface';
import { ValidationUtils } from '../../shared/utils/validation.utils';
import { EntityUtils } from '../../shared/utils/entity.utils';

export class Exam {
  private readonly _id: string;
  private readonly _props: Readonly<ExamProps>;

  constructor(id: string, props: ExamProps) {
    this._id = id;
    this._props = { ...props };
    this.validate();
  }

  public validate(): void {
    const errors: string[] = [];
    ValidationUtils.checkField(this._props.type, 'Type is required', errors);
    ValidationUtils.checkField(
      this._props.method,
      'Method is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.clinicalHistory,
      'Clinical history is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.mainComplaint,
      'Main complaint is required',
      errors,
    );

    if (errors.length > 0) {
      throw new InvalidExamException(errors.join('; '));
    }
  }

  addReport(report: Report) {
    EntityUtils.addToCollection(this._props.reports, report, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._props.reports,
        'Report',
        InvalidExamException,
      ),
    );
  }

  get id(): string {
    return this._id;
  }

  get date(): Date {
    return this._props.date;
  }

  get type(): string {
    return this._props.type;
  }

  get method(): string {
    return this._props.method;
  }

  get valuesObtained(): ExamValues {
    return this._props.valuesObtained;
  }

  get referenceValues(): ReferenceValues {
    return this._props.referenceValues;
  }

  get images(): string[] {
    return this._props.images;
  }

  get tussCode(): TUSSCode {
    return this._props.TUSSCode;
  }

  get cbhpmCode(): CBHPMCode {
    return this._props.CBHPMCode;
  }

  get ciefasCode(): CIEFASCode {
    return this._props.CIEFASCode;
  }

  get clinicalHistory(): string {
    return this._props.clinicalHistory;
  }

  get mainComplaint(): string {
    return this._props.mainComplaint;
  }

  get patient(): Patient {
    return this._props.patient;
  }

  get doctor(): Doctor {
    return this._props.doctor;
  }

  get clinic(): Clinic {
    return this._props.clinic;
  }

  get reports(): Report[] {
    return [...this._props.reports];
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }
}
