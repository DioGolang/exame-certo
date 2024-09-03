import { ExamProps } from "../interfaces/props/exam-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { Patient } from "../entities/patient.entity";
import { Exam } from "../entities/exam.entity";
import { ReferenceValues } from "../value-objects/reference-values.vo";
import { ExamValues } from "../value-objects/exam-values.vo";
import { Report } from "../entities/report.entity";
import { Clinic } from "../entities/clinic.entity";
import { Doctor } from "../entities/doctor.entity";
import { TUSSCode } from "../value-objects/tuss-code.vo";
import { CBHPMCode } from "../value-objects/cbhpm-code.vo";
import { CIEFASCode } from "../value-objects/ciefas-code.vo";


export class ExamBuild{
  private _id: string;
  private _props: Partial<ExamProps>;

 private constructor() { }

  public static create(): ExamBuild{
   const builder = new ExamBuild();
   builder._id = uuidv4();
   return builder;
  }

  public static rehydrate(id: string): ExamBuild{
   const builder = new ExamBuild();
   builder._id = id;
   return builder;
  }

  withPatient(patient: Patient): ExamBuild{
   this._props.patient = patient;
   return this;
  }

  withDoctor(doctor: Doctor): ExamBuild{
   this._props.doctor = doctor;
   return this;
  }

  withClinic(clinic: Clinic): ExamBuild{
   this._props.clinic = clinic;
   return this;
  }

  withReport(report: Report): ExamBuild{
   this._props.report = report;
   return this;
  }

  withDate(date: Date): ExamBuild{
   this._props.date = date;
   return this;
  }

  withType(type: string): ExamBuild{
   this._props.type = type;
   return this;
  }

  withMethod(method: string): ExamBuild{
   this._props.method = method;
   return this;
  }

  withValuesObtained(valuesObtained: ExamValues): ExamBuild{
   this._props.valuesObtained = valuesObtained;
   return this;
  }

  withReferenceValues(referenceValues: ReferenceValues): ExamBuild{
   this._props.referenceValues = referenceValues;
   return this;
  }

  withImages(images: string[]): ExamBuild{
   this._props.images = images;
   return this;
  }

  withTUSSCode(TUSSCode: TUSSCode): ExamBuild{
   this._props.TUSSCode = TUSSCode;
   return this;
  }

  withCBHPMCode(CBHPMCode: CBHPMCode): ExamBuild{
   this._props.CBHPMCode = CBHPMCode;
   return this;
  }

  withCIEFASCode(CIEFASCode: CIEFASCode): ExamBuild{
   this._props.CIEFASCode = CIEFASCode;
   return this;
  }

  withClinicalHistory(clinicalHistory: string): ExamBuild{
   this._props.clinicalHistory = clinicalHistory;
   return this;
  }

  withMainComplaint(mainComplaint: string): ExamBuild{
   this._props.mainComplaint = mainComplaint;
   return this;
  }

  async build(): Promise<Exam>{
   return new Exam(this._id, this._props as ExamProps);
  }


}