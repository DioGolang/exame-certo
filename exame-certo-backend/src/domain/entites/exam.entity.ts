import { Patient } from "./patient.entity";
import { Clinic } from "./clinic.entity";
import { Doctor } from "./doctor.entity";
import { ExamValues } from "../value-objects/exam-values.vo";
import { ReferenceValues } from "../value-objects/reference-values.vo";
import { TUSSCode } from "../value-objects/tuss-code.vo";
import { CBHPMCode } from "../value-objects/cbhpm-code.vo";
import { CIEFASCode } from "../value-objects/ciefas-code.vo";

export class Exam {

  constructor(
   private readonly _id: string | null,
   private readonly _patient: Patient,
   private readonly _clinic: Clinic,
   private readonly _doctor: Doctor,
   private readonly _date: Date,
   private readonly _type: string,
   private readonly _method: string,
   private readonly _valuesObtained: ExamValues,
   private readonly _referenceValues: ReferenceValues,
   private readonly _images: string[],
   private readonly _tussCode: TUSSCode,
   private readonly _cbhpmCode: CBHPMCode,
   private readonly _ciefasCode: CIEFASCode,
   private readonly _clinicalHistory: string,
   private readonly _mainComplaint: string,
  ) { }

  get id(): string{
    return this._id;
  }

  get patient(): Patient {
    return this._patient;
  }

  get clinic(): Clinic {
    return this._clinic;
  }

  get doctor(): Doctor {
    return this._doctor;
  }

  get date(): Date {
    return this._date;
  }

  get type(): string {
    return this._type;
  }

  get method(): string {
    return this._method;
  }

  get valuesObtained(): ExamValues {
    return this._valuesObtained;
  }

  get referenceValues(): ReferenceValues {
    return this._referenceValues;
  }

  get images(): string[] {
    return this._images;
  }

  get tussCode(): TUSSCode {
    return this._tussCode;
  }

  get cbhpmCode(): CBHPMCode {
    return this._cbhpmCode;
  }

  get ciefasCode(): CIEFASCode {
    return this._ciefasCode;
  }

  get clinicalHistory(): string {
    return this._clinicalHistory;
  }

  get mainComplaint(): string {
    return this._mainComplaint;
  }

}
