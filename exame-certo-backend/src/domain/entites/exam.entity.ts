import { Patient } from "./patient.entity";
import { Clinic } from "./clinic.entity";
import { Doctor } from "./doctor.entity";
import { ExamValues } from "../value-objects/exam-values.vo";
import { ReferenceValues } from "../value-objects/reference-values.vo";
import { TUSSCode } from "../value-objects/tuss-code.vo";
import { CBHPMCode } from "../value-objects/cbhpm-code.vo";
import { CIEFASCode } from "../value-objects/ciefas-code.vo";

export class Exam {
  id: string; // UUID
  patient: Patient;
  clinic: Clinic;
  doctor: Doctor;
  date: Date;
  type: string;
  method: string;
  valuesObtained: ExamValues;
  referenceValues: ReferenceValues;
  images: string[];
  tussCode: TUSSCode;
  cbhpmCode: CBHPMCode;
  ciefasCode: CIEFASCode;
  clinicalHistory: string;
  mainComplaint: string;
}
